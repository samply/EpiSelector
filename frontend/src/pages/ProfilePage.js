import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    IconButton,
    Tooltip,
    Alert
} from '@mui/material';
import {
    Download,
    Delete,
    Visibility,
    Analytics,
    Person,
    Email,
    DateRange
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
    const { user, savedProcesses, getSavedProcesses, deleteProcess, downloadProcessResults } = useAuth();
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [processToDelete, setProcessToDelete] = useState(null);
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [error, setError] = useState('');

    // Load saved processes when component mounts
    useEffect(() => {
        if (user) {
            loadSavedProcesses();
        }
    }, [user]);

    const loadSavedProcesses = async () => {
        try {
            setLoading(true);
            await getSavedProcesses(); // This will load the mock data
        } catch (error) {
            console.error('Error loading saved processes:', error);
            setError('Fehler beim Laden der gespeicherten Prozesse');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('de-DE', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'success';
            case 'running': return 'warning';
            case 'failed': return 'error';
            default: return 'default';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'completed': return 'Abgeschlossen';
            case 'running': return 'Läuft';
            case 'failed': return 'Fehlgeschlagen';
            default: return 'Unbekannt';
        }
    };

    const handleDeleteClick = (process) => {
        setProcessToDelete(process);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteProcess(processToDelete.id);
        } catch (error) {
            console.error('Error deleting process:', error);
            setError('Fehler beim Löschen des Prozesses');
        }
        
        setDeleteDialogOpen(false);
        setProcessToDelete(null);
    };

    const handleViewClick = (process) => {
        setSelectedProcess(process);
        setViewDialogOpen(true);
    };

    const handleDownload = async (process) => {
        try {
            await downloadProcessResults(process.id);
        } catch (error) {
            console.error('Error downloading results:', error);
            setError('Download fehlgeschlagen');
        }
    };

    if (!user) {
        return (
            <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        Bitte melden Sie sich an, um Ihr Profil zu sehen.
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: 2 }}>
            {/* User Info Card */}
            <Card sx={{ 
                width: "100%", 
                borderRadius: '10px 10px 10px 10px', 
                position: 'relative', 
                height: "auto",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column"
            }}>
                <CardHeader
                    title="Mein Profil"
                    titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                    sx={{ backgroundColor: "#E9F0FF", minWidth: "100%", flexShrink: 0 }}
                />
                <CardContent sx={{ 
                    backgroundColor: "white", 
                    width: "100%", 
                    flex: 1,
                    padding: "16px",
                    paddingBottom: "20px"
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Person sx={{ color: 'primary.main' }} />
                        <Typography variant="h6">
                            {user.first_name} {user.last_name}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Email sx={{ color: 'primary.main' }} />
                        <Typography variant="body1">
                            {user.email}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DateRange sx={{ color: 'primary.main' }} />
                        <Typography variant="body1">
                            Mitglied seit: {formatDate(user.created_at || new Date())}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* Saved Processes Card */}
            <Card sx={{ 
                width: "100%", 
                borderRadius: '10px 10px 10px 10px', 
                position: 'relative',
                height: "calc(100vh - 320px)",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column"
            }}>
                <CardHeader
                    title="Gespeicherte Matching-Prozesse"
                    titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                    sx={{ backgroundColor: "#E9F0FF", minWidth: "100%", flexShrink: 0 }}
                />
                <CardContent sx={{ 
                    backgroundColor: "white", 
                    width: "97%", 
                    flex: 1,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column"
                }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    {loading ? (
                        <Typography>Lade gespeicherte Prozesse...</Typography>
                    ) : savedProcesses.length === 0 ? (
                        <Typography color="text.secondary">
                            Noch keine Matching-Prozesse gespeichert.
                        </Typography>
                    ) : (
                        <TableContainer 
                            component={Paper} 
                            sx={{ 
                                overflowX: 'auto', 
                                flex: 1, 
                                height: '100%',
                                maxHeight: 'calc(100% - 40px)'
                            }}
                        >
                            <Table size="small" sx={{ '& .MuiTableCell-root': { padding: '4px 8px' } }}>
                                <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 100, padding: '4px 6px' }}><strong>Name</strong></TableCell>
                                        <TableCell sx={{ minWidth: 80, padding: '4px 6px' }}><strong>Erstellt</strong></TableCell>
                                        <TableCell sx={{ minWidth: 80, padding: '4px 6px' }}><strong>Methode</strong></TableCell>
                                        <TableCell sx={{ minWidth: 60, padding: '4px 6px' }}><strong>Zielvar.</strong></TableCell>
                                        <TableCell sx={{ minWidth: 60, padding: '4px 6px' }}><strong>Erg.</strong></TableCell>
                                        <TableCell sx={{ minWidth: 60, padding: '4px 6px' }}><strong>Status</strong></TableCell>
                                        <TableCell sx={{ minWidth: 80, padding: '4px 6px' }}><strong>Aktionen</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {savedProcesses.map((process) => (
                                        <TableRow key={process.id}>
                                            <TableCell sx={{ maxWidth: 120, padding: '4px 6px' }}>
                                                <Typography variant="body2" noWrap title={process.name} sx={{ fontSize: '14px' }}>
                                                    {process.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ fontSize: '14px', padding: '4px 6px' }}>
                                                {formatDate(process.created_at).split(' ')[0]}
                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 6px' }}>
                                                <Chip 
                                                    label={process.matching_method === 'Propensity Score' ? 'PS' : process.matching_method === 'Exaktes Matching' ? 'EM' : process.matching_method} 
                                                    size="small" 
                                                    variant="outlined"
                                                    sx={{ fontSize: '14px', height: 20, minWidth: 30 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 6px' }}>
                                                <Typography variant="body2" component="code" sx={{ fontSize: '14px' }} noWrap>
                                                    {process.target_variable}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 6px' }}>
                                                <Typography variant="body2" sx={{ fontSize: '14px', display: 'flex', alignItems: 'center', gap: 0.3 }}>
                                                    <Analytics fontSize="inherit" />
                                                    {process.result_count}
                                                </Typography>
                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 6px' }}>
                                                <Chip 
                                                    label={getStatusText(process.status)} 
                                                    size="small" 
                                                    color={getStatusColor(process.status)}
                                                    sx={{ fontSize: '12px', height: 20, minWidth: 50 }}
                                                />
                                            </TableCell>
                                            <TableCell sx={{ padding: '4px 4px' }}>
                                                <Box sx={{ display: 'flex', gap: 0.3 }}>
                                                    <Tooltip title="Details anzeigen">
                                                        <IconButton 
                                                            size="small" 
                                                            onClick={() => handleViewClick(process)}
                                                        >
                                                            <Visibility />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Ergebnisse herunterladen">
                                                        <IconButton 
                                                            size="small" 
                                                            onClick={() => handleDownload(process)}
                                                            disabled={process.status !== 'completed'}
                                                        >
                                                            <Download />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Löschen">
                                                        <IconButton 
                                                            size="small" 
                                                            onClick={() => handleDeleteClick(process)}
                                                            color="error"
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    </Tooltip>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Prozess löschen</DialogTitle>
                <DialogContent>
                    <Typography>
                        Möchten Sie den Prozess "{processToDelete?.name}" wirklich löschen? 
                        Diese Aktion kann nicht rückgängig gemacht werden.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Abbrechen
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Löschen
                    </Button>
                </DialogActions>
            </Dialog>

            {/* View Details Dialog */}
            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Prozess Details: {selectedProcess?.name}</DialogTitle>
                <DialogContent>
                    {selectedProcess && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>Konfiguration</Typography>
                            <Typography><strong>Matching-Methode:</strong> {selectedProcess.matching_method}</Typography>
                            <Typography><strong>Algorithmus:</strong> {selectedProcess.algorithm}</Typography>
                            <Typography><strong>Zielvariable:</strong> {selectedProcess.target_variable}</Typography>
                            <Typography><strong>Kontrollvariablen:</strong></Typography>
                            <Box sx={{ ml: 2, mt: 1 }}>
                                {selectedProcess.control_variables?.map((variable, index) => (
                                    <Chip key={index} label={variable} size="small" sx={{ mr: 1, mb: 1 }} />
                                ))}
                            </Box>
                            <Typography sx={{ mt: 2 }}><strong>Anzahl Ergebnisse:</strong> {selectedProcess.result_count}</Typography>
                            <Typography><strong>Erstellt am:</strong> {formatDate(selectedProcess.created_at)}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>
                        Schließen
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ProfilePage;
