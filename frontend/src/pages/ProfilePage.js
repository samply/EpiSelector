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
    DateRange
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

function ProfilePage() {
    const { currentUser, getSavedProcesses, deleteMatchingProcess, getMatchingProcess } = useAuth();
    const [loading, setLoading] = useState(true);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [processToDelete, setProcessToDelete] = useState(null);
    const [selectedProcess, setSelectedProcess] = useState(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [error, setError] = useState('');
    const [savedProcesses, setSavedProcesses] = useState([]);

    // Load saved processes when component mounts
    useEffect(() => {
        if (currentUser) {
            loadSavedProcesses();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    const loadSavedProcesses = async () => {
        try {
            setLoading(true);
            setError('');
            console.log('📋 Loading saved processes...');
            
            const result = await getSavedProcesses();
            
            if (result.success) {
                // Prüfe ob es sich um Demo-Daten oder Backend-Daten handelt
                const transformedProcesses = result.processes.map(process => {
                    // Wenn bereits transformierte Demo-Daten, nutze sie direkt
                    if (process.matching_method && process.name) {
                        return {
                            ...process,
                            rawData: process
                        };
                    }
                    
                    // Transformiere Backend-Daten in Frontend-Format
                    return {
                        id: process.id,
                        name: `${process.mmethod || 'Unknown'} - ${process.groupindicator || 'Matching'}`,
                        created_at: process.created_at,
                        matching_method: process.mmethod || 'Unknown',
                        algorithm: process.mdistance || 'nearest',
                        target_variable: process.groupindicator || 'Unknown',
                        control_variables: Array.isArray(process.controllvariables) ? process.controllvariables : [],
                        result_count: estimateResultCount(process),
                        status: 'completed',
                        // Rohdaten für Details
                        rawData: process
                    };
                });
                
                setSavedProcesses(transformedProcesses);
            } else {
                setError(result.message || 'Error loading processes');
                setSavedProcesses([]);
            }
        } catch (error) {
            console.error('❌ Error loading saved processes:', error);
            setError('Error loading saved processes');
            setSavedProcesses([]);
        } finally {
            setLoading(false);
        }
    };

    const estimateResultCount = (process) => {
        try {
            if (process.dataset_json) {
                const dataset = JSON.parse(process.dataset_json);
                return Array.isArray(dataset) ? dataset.length : 0;
            }
            // Fallback-Schätzung
            return process.mratio ? process.mratio * 50 : 100;
        } catch {
            return 0;
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
            case 'completed': return 'Completed';
            case 'running': return 'Running';
            case 'failed': return 'Failed';
            default: return 'Unknown';
        }
    };

    const handleDeleteClick = (process) => {
        setProcessToDelete(process);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            console.log('🗑️ Deleting process:', processToDelete.id);
            
            const result = await deleteMatchingProcess(processToDelete.id);
            
            if (result.success) {
                console.log('✅ Process successfully deleted');
                // Aktualisiere die Liste
                await loadSavedProcesses();
            } else {
                setError(result.message || 'Error deleting process');
            }
        } catch (error) {
            console.error('❌ Error deleting process:', error);
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
            console.log('🔄 Download für Prozess:', process.id);
            
            // Falls es Backend-Download-Funktionalität gibt, können wir sie hier implementieren
            // Für jetzt erstellen wir eine einfache JSON-Download-Lösung
            const result = await getMatchingProcess(process.id);
            
            if (result.success && result.process.dataset_json) {
                // JSON-Daten als Download anbieten
                const datasetData = JSON.parse(result.process.dataset_json);
                const blob = new Blob([JSON.stringify(datasetData, null, 2)], { type: 'application/json' });
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `matching_results_${process.id}.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                
                console.log('✅ Download erfolgreich');
            } else {
                setError('Keine Daten zum Download verfügbar');
            }
        } catch (error) {
            console.error('❌ Fehler beim Download:', error);
            setError('Download fehlgeschlagen');
        }
    };

    if (!currentUser) {
        return (
            <Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
                <CardContent>
                    <Typography variant="h6" color="text.secondary">
                        Please log in to view your profile.
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Box sx={{ 
            width: "100%", 
            height: "100vh", 
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 2,
            boxSizing: "border-box",
            overflow: "auto"
        }}>
            {/* User Info Card */}
            <Card sx={{ 
                width: "100%", 
                borderRadius: '10px', 
                height: "auto",
                maxHeight: "150px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column"
            }}>
                <CardHeader
                    title="My Profile"
                    titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                    sx={{ backgroundColor: "#E9F0FF", minWidth: "100%", flexShrink: 0 }}
                />
                <CardContent sx={{ 
                    backgroundColor: "white", 
                    width: "100%", 
                    padding: "16px"
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <Person sx={{ color: 'primary.main' }} />
                        <Typography variant="body1">
                            Username: {currentUser.username}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <DateRange sx={{ color: 'primary.main' }} />
                        <Typography variant="body1">
                            Member since: {formatDate(currentUser.created_at || new Date())}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>

            {/* Saved Processes Card */}
            <Card sx={{ 
                width: "100%", 
                borderRadius: '10px', 
                minHeight: "400px",  // Mindesthöhe statt feste Höhe
                maxHeight: "600px",  // Maximale Höhe
                flexShrink: 0,  // VERHINDERT VERKLEINERUNG
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
            }}>
                <CardHeader
                    title="Saved Matching Processes"
                    titleTypographyProps={{ fontSize: 14, color: "text.secondary" }}
                    sx={{ backgroundColor: "#E9F0FF", minWidth: "100%", flexShrink: 0 }}
                />
                <CardContent sx={{ 
                    backgroundColor: "white", 
                    width: "100%", 
                    flex: 1,  // Nimmt verfügbaren Platz
                    overflow: "auto",  // Scrollbar bei Bedarf
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px"
                }}>
                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}
                    
                    {loading ? (
                        <Typography>Loading saved processes...</Typography>
                    ) : savedProcesses.length === 0 ? (
                        <Box>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>
                                No matching processes saved yet.
                            </Typography>
                            {currentUser?.is_demo && (
                                <Button 
                                    variant="outlined" 
                                    onClick={() => {
                                        // Erstelle neue Demo-Daten für den aktuellen Benutzer
                                        const existingProcesses = JSON.parse(localStorage.getItem('demo_processes') || '[]');
                                        const otherUsersProcesses = existingProcesses.filter(p => p.user_id !== currentUser.id);
                                        
                                        // Erstelle neue Demo-Daten
                                        const now = new Date();
                                        const baseId = currentUser.id === 'demo_demo' ? 1000 : currentUser.id === 'demo_test' ? 2000 : 3000;
                                        
                                        const newDemoProcesses = [
                                            {
                                                id: baseId + 1,
                                                user_id: currentUser.id,
                                                name: 'Propensity Score - Treatment Analysis',
                                                matching_method: 'Propensity Score',
                                                target_variable: 'treatment_group',
                                                control_variables: ['age', 'gender', 'education', 'income'],
                                                ratio: '1',
                                                score_method: 'Logistic Regression',
                                                match_value: '0.1',
                                                result_count: 245,
                                                status: 'completed',
                                                created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()
                                            },
                                            {
                                                id: baseId + 2,
                                                user_id: currentUser.id,
                                                name: 'Exact Matching - Control Study',
                                                matching_method: 'Exact Matching',
                                                target_variable: 'control_group',
                                                result_count: 189,
                                                status: 'completed',
                                                created_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
                                            },
                                            {
                                                id: baseId + 3,
                                                user_id: currentUser.id,
                                                name: 'PS Healthcare Access Study',
                                                matching_method: 'Propensity Score',
                                                target_variable: 'healthcare_access',
                                                result_count: 312,
                                                status: 'running',
                                                created_at: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString()
                                            }
                                        ];
                                        
                                        const allProcesses = [...otherUsersProcesses, ...newDemoProcesses];
                                        localStorage.setItem('demo_processes', JSON.stringify(allProcesses));
                                        loadSavedProcesses();
                                    }}
                                    size="small"
                                >
                                    Load Demo Data
                                </Button>
                            )}
                        </Box>
                    ) : (
                        <TableContainer 
                            component={Paper} 
                            sx={{ 
                                overflow: 'auto', 
                                height: "300px",  // FESTE HÖHE FÜR TABELLE
                                maxHeight: "300px"
                            }}
                        >
                            <Table size="small" sx={{ '& .MuiTableCell-root': { padding: '4px 8px' } }}>
                                <TableHead sx={{ backgroundColor: "#d7d7d7" }}>
                                    <TableRow>
                                        <TableCell sx={{ minWidth: 100, padding: '4px 6px' }}><strong>Name</strong></TableCell>
                                        <TableCell sx={{ minWidth: 80, padding: '4px 6px' }}><strong>Created</strong></TableCell>
                                        <TableCell sx={{ minWidth: 80, padding: '4px 6px' }}><strong>Method</strong></TableCell>
                                        <TableCell sx={{ minWidth: 60, padding: '4px 6px' }}><strong>Target Var.</strong></TableCell>
                                        <TableCell sx={{ minWidth: 60, padding: '4px 6px' }}><strong>Results</strong></TableCell>
                                        <TableCell sx={{ minWidth: 60, padding: '4px 6px' }}><strong>Status</strong></TableCell>
                                        <TableCell sx={{ minWidth: 80, padding: '4px 6px' }}><strong>Actions</strong></TableCell>
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

            {/* Platzhalter für Matching-Ergebnisse (falls später hinzugefügt) */}
            <Box sx={{ 
                height: "100px", 
                backgroundColor: "transparent",
                marginBottom: 2 
            }}>
                {/* Dieser Bereich kann später für Matching-Ergebnisse verwendet werden */}
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Prozess löschen</DialogTitle>
                <DialogContent>
                    <Typography>
                        Do you really want to delete the process "{processToDelete?.name}"? 
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* View Details Dialog */}
            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} maxWidth="md" fullWidth>
                <DialogTitle>Process Details: {selectedProcess?.name}</DialogTitle>
                <DialogContent>
                    {selectedProcess && (
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>Configuration</Typography>
                            <Typography><strong>Matching Method:</strong> {selectedProcess.matching_method || selectedProcess.matchingMethod}</Typography>
                            
                            {/* Zeige Parameter je nach Matching-Methode */}
                            {(selectedProcess.matching_method === "Propensity Score" || selectedProcess.matchingMethod === "Propensity Score") && (
                                <>
                                    {selectedProcess.target_variable && (
                                        <Typography><strong>Target Variable:</strong> {selectedProcess.target_variable}</Typography>
                                    )}
                                    {(selectedProcess.control_variables || selectedProcess.controlVariables) && (
                                        <>
                                            <Typography><strong>Control Variables:</strong></Typography>
                                            <Box sx={{ ml: 2, mt: 1 }}>
                                                {(selectedProcess.control_variables || selectedProcess.controlVariables)?.map((variable, index) => (
                                                    <Chip key={index} label={variable} size="small" sx={{ mr: 1, mb: 1 }} />
                                                ))}
                                            </Box>
                                        </>
                                    )}
                                    {(selectedProcess.ratio || selectedProcess.ratio) && (
                                        <Typography><strong>Ratio:</strong> 1:{selectedProcess.ratio}</Typography>
                                    )}
                                    {(selectedProcess.score_method || selectedProcess.scoreMethod) && (
                                        <Typography><strong>Score Method:</strong> {selectedProcess.score_method || selectedProcess.scoreMethod}</Typography>
                                    )}
                                    {(selectedProcess.match_value || selectedProcess.matchValue) && (
                                        <Typography><strong>Match Value:</strong> ±{selectedProcess.match_value || selectedProcess.matchValue}</Typography>
                                    )}
                                </>
                            )}
                            
                            {/* Exaktes Matching Parameter */}
                            {(selectedProcess.matching_method === "Exaktes Matching" || selectedProcess.matchingMethod === "Exaktes Matching") && (
                                <>
                                    {(selectedProcess.groupIndicator) && (
                                        <Typography><strong>Comparison Groups:</strong> {selectedProcess.groupIndicator}</Typography>
                                    )}
                                    {(selectedProcess.matchingVariables) && (
                                        <>
                                            <Typography><strong>Matching Variables:</strong></Typography>
                                            <Box sx={{ ml: 2, mt: 1 }}>
                                                {selectedProcess.matchingVariables?.map((variable, index) => {
                                                    // Extrahiere nur den var-Teil aus dem Objekt
                                                    const variableName = typeof variable === 'object' && variable !== null
                                                        ? (variable.var || variable.name || variable.label || variable.text || '')
                                                        : variable;
                                                    return variableName ? (
                                                        <Chip key={index} label={variableName} size="small" sx={{ mr: 1, mb: 1 }} />
                                                    ) : null;
                                                }).filter(chip => chip !== null)}
                                            </Box>
                                        </>
                                    )}
                                    {(selectedProcess.matchingTolerance) && (
                                        <Typography><strong>Matching Tolerance:</strong> {
                                            Array.isArray(selectedProcess.matchingTolerance)
                                                ? selectedProcess.matchingTolerance.map(tol => 
                                                    typeof tol === 'string' ? tol.trim() : tol
                                                  ).join(', ')
                                                : (typeof selectedProcess.matchingTolerance === 'object' 
                                                    ? JSON.stringify(selectedProcess.matchingTolerance)
                                                    : selectedProcess.matchingTolerance)
                                        }</Typography>
                                    )}
                                    {(selectedProcess.ratio && selectedProcess.ratio !== "defaultVerhältnis") && (
                                        <Typography><strong>Matching Ratio:</strong> 1:{selectedProcess.ratio}</Typography>
                                    )}
                                </>
                            )}
                            
                            {/* Für alle Methoden relevante Parameter */}
                            {(selectedProcess.algorithm && selectedProcess.algorithm !== "defaultAlgo") && (
                                <Typography><strong>Algorithm:</strong> {selectedProcess.algorithm}</Typography>
                            )}
                            
                            {(selectedProcess.replacement !== undefined || selectedProcess.replacement !== undefined) && (
                                <Typography><strong>Replacement:</strong> {
                                    selectedProcess.replacement === "TRUE" || selectedProcess.replacement === true 
                                        ? 'Yes' 
                                        : 'No'
                                }</Typography>
                            )}
                            
                            {(selectedProcess.tolerance !== undefined) && (
                                <Typography><strong>Tolerance:</strong> {selectedProcess.tolerance}</Typography>
                            )}
                            
                            <Typography sx={{ mt: 2 }}><strong>Number of Results:</strong> {selectedProcess.result_count || selectedProcess.resultCount || 0}</Typography>
                            <Typography><strong>Created on:</strong> {formatDate(selectedProcess.created_at)}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ProfilePage;
