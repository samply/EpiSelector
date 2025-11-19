import * as React from 'react';
import '../App.css';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    backgroundColor:'#f7f7f7',
    _minHeight: '100%',
    marginBottom:'4px',
    borderRadius: '3px 3px 3px 3px',
   "&.Mui-expanded":{
        overflow:'auto',
   }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
paddingBottom:'10px',
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',

    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),

    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    fontsize:'small',
    backgroundColor:'white',
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',


}));



function InfoBox({isWorkflow}) {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const content1 = () =>{
        if(isWorkflow === "Startseite"){
            return (<div>The observational study assistant <strong>"EpiSelector"</strong> supports researchers of all experience levels and areas of expertise, in selecting and forming suitable comparison groups. These comparison groups typically consist of groups of individual patients. EpiSelector’s primary focus is assisting with the application of matching methods, which assign similar observations.
<br/> Thus, valid comparison groups can thus be selected and matched in a reproducible and time-saving manner, even in large datasets.
<br/> Although EpiSelector was created with the greatest care, we assume no liability.
<br/><br/>
<strong>Why Matching?</strong>
<br/>Matching methods are typically applied in two types of settings:
<ol>
<li>When outcome data are not yet available, matching is used to select individuals for follow-up.
This is particularly important for studies where outcome data cannot be collected for the entire comparison group for cost reasons.</li>
<li>All outcome data are already available, and the goal of matching is to reduce biases that could result from differences (e.g., in age) between comparison groups when estimating the treatment effect.</li>
</ol>
(Stuart 2010 <a href="https://doi.org/10.1214%2F09-STS313" target="_blank" rel="noopener noreferrer">https://doi.org/10.1214%2F09-STS313</a>)


            </div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div>It is possible to upload data stored locally on your computer, or data available in the DRE (Digital Research Environment), and process them with the EpiSelector. </div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div>In this step, the CSV file is uploaded, with the data from which comparison groups will be formed, i.e., a matching will be carried out.</div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div><strong>Exact Matching on Selected Variables</strong>
<br/>If the comparison groups are to correspond exactly with respect to a specific measurement (e.g., age), and pairs are to be formed consisting of one patient from each comparison group, then exact matching e.g., on age with a 1:1 matching ratio is applied. In this case, for example, a 75-year-old individual from one comparison group is matched with a 75-year-old individual from the other group, thereby forming pairs of two individuals who are exactly the same age.
It is possible to specify a tolerance range, e.g., ±3 years, which allows a 75-year-old individual to be matched with someone aged between 72 and 78. Such a tolerance range generally serves to enable the formation of pairs with sufficient similarity when strict exact matching yields too few pairs. This can already become necessary if age is recorded not only in years but also by month and day, because in that case, exact age matching would only produce pairs of patients who are identical in age down to the very day.
Exact matching may also be conducted across several variables. In practice, age is often combined with sex as additional matching criteria.
<br/> <br/><strong>Propensity Score Matching</strong>
<br/>All covariates that need to be balanced between the treatment and control groups, because they act as potential confounders, are summarized into a single propensity score for each subject and then used for matching.
The propensity score enables the design and analysis of a non-randomized observational study in a way that mimics certain key features of a randomized controlled trial (Austin 2011, <a href="https://doi.org/10.1080/00273171.2011.568786" target="_blank" rel="noopener noreferrer">DOI: 10.1080/00273171.2011.568786</a>).
A major advantage of the propensity score is dimensionality reduction: instead of matching on several covariates separately, these covariates are reduced into one single score that characterizes a participant (Zhao 2021, <a href="http://dx.doi.org/10.21037/at" target="_blank" rel="noopener noreferrer">http://dx.doi.org/10.21037/at</a>).

            </div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div>The matching variables are intended to balance differences between the comparison groups as effectively as possible in order to reduce potential biases in the analyses. Typical matching variables include, for example, age, sex, and general health status, as well as pre-existing conditions.</div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>The matching tolerance allows, for example, age matching to be performed even when no exact matches with respect to age are available, or when such exact matches are rare. For instance, if a tolerance of ±5 years is specified, a 70-year-old individual may be matched with a 75-year-old individual.  </div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>In order to perform matching, the groups from which individuals will be selected must first be defined. The variable that distinguishes between the two groups must be binary and is referred to as the group indicator.</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>To calculate the propensity score, you must define the dependent variable. This variable is binary and distinguishes between treated and untreated individuals. Typically, it contains information on treatment assignment, for example, whether a patient received a specific therapy or not.
            </div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>It is important to include all variables in the matching process that are known to be related both to treatment assignment and to the outcome. This requirement ensures that the assumption of ignorable treatment assignment is met.
The decision on which covariates to include follows the principle of strict ignorability. In other words, matching methods and most non-experimental study designs rely on the assumption that, conditional on the observed covariates, there are no unobserved differences between the comparison groups.
(Rubin et al. 1996 <a href='https://doi.org/10.2307/2533160'>https://doi.org/10.2307/2533160</a>; Stuart et al. 2010 <a href='https://doi.org/10.1214%2F09-STS313' >https://doi.org/10.1214%2F09-STS313</a>)

            </div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div>Several approaches exist for calculating the propensity score. The current version of EpiSelector offers the most common method, which is calculation via logistic regression.
Future versions will also include the option of estimating the propensity score using machine learning methods (Caliendo et al. 2008 <a href='https://doi.org/10.1111/j.1467-6419.2007.00527.x'>https://doi.org/10.1111/j.1467-6419.2007.00527.x</a>; Inacio 2015 <a href='https://doi.org/10.1007/s11999-015-4239-4'>https://doi.org/10.1007/s11999-015-4239-4</a>).
            </div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div><strong>Propensity score matching estimators</strong> differ not only in the choice of <strong>matching algorithm</strong> used to match treated and untreated individuals, but also in the <strong>specification of the caliper, the matching ratio,</strong> and the <strong>potential reuse of a control unit</strong> (Caliendo et al. 2008 <a href='https://doi.org/10.1111/j.1467-6419.2007.00527.x'>https://doi.org/10.1111/j.1467-6419.2007.00527.x</a>).</div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>In this step, you determine <strong>how similar</strong> the propensity scores of a treated and an untreated individual must be in order to form a match.
<br/>For example, with a <strong>caliper</strong> of 0, treated and untreated individuals are only matched if their propensity scores are identical. The smaller the caliper, the fewer suitable pairs can be found. This can become a limiting factor, especially in studies with small sample sizes, as it may result in too few matched pairs being available.
</div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>This step specifies the <strong>ratio</strong> of treated to untreated individuals—for example, whether each treated person should be matched with one untreated person or with several untreated individuals.</div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div>At the end of the matching process, the dataset is described with respect to a <strong>pre-post-matching comparison</strong>, including the number of variables, observations, and the counts of treated and untreated individuals.
<br/><strong>First</strong>, a table is provided that illustrates <strong>how and whether</strong> the matching process has adjusted the <strong>mean values or the standardized mean difference (for continuous variables)</strong> and the <strong>proportions or the raw proportion difference (for categorical variables)</strong> between the comparison groups with regard to the variables to be balanced.
<br/><strong>Second</strong>, the balance of the control variables is illustrated using <strong>graphical elements</strong>. <strong>Boxplots</strong> are employed for continuous variables, while <strong>mirrored histograms</strong> are used for categorical variables to visually demonstrate the balance achieved through matching.
</div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div>At this stage, you can save the <strong>matched data</strong> for further analyses, download the <strong>matching protocol</strong> for use in publications, and store the <strong>input template</strong> for future matching procedures.</div>);
        }

    }

    const content2 = () =>{
        if(isWorkflow === "Startseite"){
            return (<div>Matching ist eine Technik, bei der Patienten mit und ohne ein interessierendes Outcome (in Fall-Kontroll-Studien) oder Patienten mit und ohne interessierende Exposition (in Kohortenstudien) so ausgewählt werden, dass sie die gleiche oder ähnliche Verteilungen bestimmter Merkmale aufweisen.
                Diese Technik wird eingesetzt, um die statistische Effizienz und die Kosteneffizienz von Studien zu erhöhen (Iwagami et al. 2022 <a href='https://doi.org/10.37737/ace.22005'>https://doi.org/10.37737/ace.22005</a> ; Stuart et al.2010 <a href='https://doi.org/10.1214%2F09-STS313'>https://doi.org/10.1214%2F09-STS313</a> ).
            </div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div></div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div></div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div><strong>Exact Matching</strong> Exact matching on selected variables is a method in which individuals from the treatment group and the comparison group are paired using identical values of predefined covariates (Zhao 2021 <a href='http://dx.doi.org/10.21037/at'></a>http://dx.doi.org/10.21037/at).
<br/><br/>
The <strong>propensity score</strong> is the probability of receiving treatment, given the observed baseline characteristics. As a balancing score, it ensures that, after matching based on the propensity score, the distribution of the observed covariates included in its calculation will be similar between the treatment and comparison groups (Austin 2011 DOI: <a href='https://doi.org/10.1080/00273171.2011.568786'></a>10.1080/00273171.2011.568786).
</div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div><strong>Matching variables</strong> are the characteristics or factors used in the matching process to form similar pairs or comparison groups.</div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>The <strong>matching tolerance (Caliper Width</strong> )defines what counts as an exact match (<a href='https://cran.r-project.org/web/packages/MatchIt/MatchIt.pdf'></a>https://cran.r-project.org/web/packages/MatchIt/MatchIt.pdf).</div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>The <strong>group indicator</strong> is the variable that determines whether an individual belongs to the treatment group or to the comparison group.</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>The <strong>target variable of the propensity score</strong> is the dependent binary variable used in the model to calculate the propensity score. It indicates whether an individual belongs to the treatment group or the comparison group.
<br/>This target variable is used to estimate the probability that each patient receives the treatment—that is, the individual propensity score.
</div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>Control variables are variables collected as part of a study that are neither the outcome nor the exposure of interest (Inacio 2015 <a href='https://doi.org/10.1007/s11999-015-4239-4'></a>https://doi.org/10.1007/s11999-015-4239-4; Caliendo et al. 2008 <a href='https://doi.org/10.1111/j.1467-6419.2007.00527.x'></a>https://doi.org/10.1111/j.1467-6419.2007.00527.x; Pufulete et al. 2022 <a href='https://doi.org/10.1016/j.jclinepi.2022.03.018'></a>https://doi.org/10.1016/j.jclinepi.2022.03.018).</div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div> The <strong>propensity score</strong> is calculated by fitting a <strong>logistic regression model</strong> with treatment assignment as the dependent variable.
The logistic regression model estimates the probability of a dependent variable based on a set of independent variables. This is the most widely used method for calculating the propensity score (Inacio et al. 2015 <a href='https://doi.org/10.1007/s11999-015-4239-4'></a>https://doi.org/10.1007/s11999-015-4239-4; Rubin et al. 1996 <a href='https://doi.org/10.2307/2533160'></a>https://doi.org/10.2307/2533160; Austin 2011 <a href='https://doi.org/10.1080/00273171.2011.568786'></a>https://doi.org/10.1080/00273171.2011.568786).

            </div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div><strong>Nearest Neighbour Matching (NNM):</strong> In seiner einfachsten Form wählt das 1 : 1 Nearest Neighbor Matching für jedes behandelte Individuum i in einer bestimmten Reihenfolge ein nicht behandeltes individuummit dem geringsten Abstand zum Individuum i. (Stuart et al 2010  10.1214/09-STS313 ; Rubin 1973 <a href='https://doi.org/10.2307/2529684'></a>https://doi.org/10.2307/2529684; )
               <br/> <strong>Das Optimal Matching (OM)</strong> findet die engste Paarung von Individuen unter Berücksichtigung bestimmter Anforderungen oder Beschränkungen für das Gleichgewicht der Kovariaten (Rosenbaum 2020 <a href='https://dx.doi.org/10.1146/annurev-statistics-031219-041058'>https://dx.doi.org/10.1146/annurev-statistics-031219-041058</a> ).
               <br/> Das Optimal Matching vermeidet das Problem, dass die Reihenfolge, in der die behandelten Subjekte gematcht werden, die Qualität der Matches verändert, indem es bei der Auswahl der einzelnen Matches die Gesamtheit der Matches berücksichtigt und das globales Abstandsmaß minimiert (Rubin et al 1996 <a href='https://doi.org/10.2307/2533160'>https://doi.org/10.2307/2533160</a> ) (Stuart et al 2010 <a href='https://doi.org/10.1214%2F09-STS313'>https://doi.org/10.1214%2F09-STS313</a> )
            </div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>If the distribution of propensity scores differs greatly between the treatment and comparison groups, the distance between the propensity scores of a matched pair may be very large. In such cases, it is advisable to apply a caliper during the matching process.
<br/>With a caliper, each treated case can only be matched to controls whose propensity scores fall within a defined range. If no suitable untreated individual is found within this range, the treated individual should be excluded from the analysis (Zhao 2021 <a href='http://dx.doi.org/10.21037/atm-20-3998'></a>http://dx.doi.org/10.21037/atm-20-3998).
</div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>The <a>matching ratio</a> specifies how many untreated individuals are matched to each treated individual.</div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div></div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div></div>);
        }

    }

    const content3 = () =>{
        if(isWorkflow === "Startseite"){return (<div>
Before starting the EpiSelector, please read and confirm the following notice by clicking the "Start" button.
<br/><br/>
<strong>Please note the following:</strong>
<ul>
<li>Your data must be in CSV format. The variables must be in the columns, and the observations must be in the rows.</li>
<li>EpiSelector supports the complete matching process, but not the preliminary data analysis required to identify control variables, the balance of which between treated and untreated groups is the goal of the matching process.</li>
<li>If you have saved input templates from previous matching sessions, you can reuse and select one of these templates with your specific matching settings and apply it to this current session's matching process. To do so, select your template and click Start.</li>
</ul>
</div>);
        }
        if(isWorkflow === "Datenquelle"){
            return (<div>Choose a <strong>data source </strong>from which you would like to upload your observations.
You can either upload your data locally from your device or from the Digital Research Environment (DRE).
To upload from the DRE, you must already be registered there.
Please note that your data must be in CSV format, with variables arranged in columns and observations in rows.
</div>);
        }
        if(isWorkflow === "Datei-hochladen"){
            return (<div>Upload your CSV file here.

<br/><br/>You have two options:
<ul><li>Drag and drop your CSV file from the file explorer into the designated upload area, OR</li>
<li>Click on the designated upload area to open the file explorer automatically. Then select the CSV file you wish to use for the matching process.</li></ul>
 </div>);
        }
        if(isWorkflow === "Matching-Methode"){
            return (<div><strong>Exact matching on selected variables</strong> is suitable when only a few covariates influence treatment assignment.
<br/>As the number of covariates increases, the number of possible exact matches grows exponentially, even when all covariates are binary, often resulting in poor matching quality (Zhao 2021 <a href='http://dx.doi.org/10.21037/at'></a>http://dx.doi.org/10.21037/at).
<br/>In such cases, <strong>propensity score matching</strong> is the more appropriate method.
 </div>);
        }
        /* EXAKTES MATCHING */
        if(isWorkflow === "Matchingvariablen"){
            return (<div>Die Auswahl der Matching-Variablen sollte auf theoretischen Überlegungen und Fachkenntnissen basieren, um sicherzustellen, dass wichtige Einflussfaktoren berücksichtigt werden. Die Matching-Variablen sollten als wichtige Einflussfaktoren auf die Behandlungszuweisung betrachtet werden.
<br/>
                Sie können mehrere Variablen auswählen, nach denen die Behandelten und die Nichtbehandelten gematcht werden sollen.
                Bitte beachten Sie, dass bei diesem Matching-Verfahren der Ausgleich zwischen den Vergleichsgruppen umso schwieriger wird, je mehr Variablen Sie auswählen und je mehr Ausprägungen die Matching-Variablen haben.
                Metrische Variablen (z.B. Alter, bestimmte medizinische Parameter) sind daher für dieses Matching-Verfahren nur dann geeignet, wenn eine entsprechende Matching-Toleranz angegeben wird.
            </div>);
        }
        if(isWorkflow === "Matchingtoleranz"){
            return (<div>The <strong>selection of matching variables</strong> should be based on theoretical considerations and expert knowledge to ensure that all relevant determinants are taken into account. Matching variables should be regarded as <strong>key determinants of treatment assignment</strong>.
<br/>You may select multiple variables on which treated and untreated individuals are to be matched. However, keep in mind that the more variables you include, and the more categories these variables have, the harder it becomes to achieve balance between comparison groups.
<br/>Metric variables (e.g., age, specific medical parameters) are only suitable for this matching method if a corresponding <strong>matching tolerance (caliper)</strong> is specified.
</div>);
        }
        if(isWorkflow === "VariableFälleKontrolle"){
            return (<div>Only one variable can be chosen here as the <strong>group indicator</strong>, since this variable defines whether an individual belongs to the treatment group or to the comparison group.</div>);
        }
        /* PROPENSITY SCORE MATCHING */
        if(isWorkflow === "Zielvariable"){
            return (<div>Select the variable here that contains the information on whether a patient received a treatment or not. In the propensity score model, this variable serves as the dependent variable. <strong>Only a single binary variable can be chosen.</strong></div>);
        }
        if(isWorkflow === "Kontrollvariablen"){
            return (<div>Select the variables here that will be included in the calculation of the propensity score. These variables are used to balance the treatment and comparison groups through matching. Multiple variables may be selected.</div>);
        }
        if(isWorkflow === "ScoreBerechnung"){
            return (<div>Presently, the propensity score can only be calculated using logistic regression. Machine learning methods will be offered in a future version.
            </div>);
        }
        if(isWorkflow === "Matching-Algorithmus"){
            return (<div><strong>Matching with replacement</strong> involves a trade-off between bias and variance. Allowing replacement improves the average quality of matches and reduces bias.
<br/>This approach is particularly useful when the distribution of propensity scores differs substantially between the treatment and comparison groups (Caliendo 2008 <a href='https://doi.org/10.1111/j.1467-6419.2007.00527.x'></a>https://doi.org/10.1111/j.1467-6419.2007.00527.x; Iwagami et al. 2022 <a href='https://doi.org/10.37737/ace.22005'></a>https://doi.org/10.37737/ace.22005).
 </div>);
        }
        if(isWorkflow === "Übereinstimmung"){
            return (<div>In Nearest Neighbor Matching (NNM), there is a risk of poor matches when the nearest neighbor is far away. This can be avoided by setting a tolerance threshold, known as a caliper, for the maximum allowed propensity score distance. Using a caliper helps prevent poor matches and improves overall matching quality (Caliendo 2008 <a href='https://doi.org/10.1111/j.1467-6419.2007.00527.x'></a>https://doi.org/10.1111/j.1467-6419.2007.00527.x).

<br/><br/>Although there is no universal gold standard for maximum acceptable differences, a simulation study by Austin suggested a caliper width of 0.2 (Austin 2011 <a href='https://doi.org/10.1002/pst.433'></a>https://doi.org/10.1002/pst.433).

<br/><br/>We recommend:
<ol>
<li>If matching performance is poor (e.g., some covariates remain imbalanced), use a narrower caliper width.</li>
<li>If matching is successful but the number of matched pairs is too small, consider widening the caliper (Zhao et al. 2021 <a href='https://doi.org/10.21037/atm-20-3998'></a>https://doi.org/10.21037/atm-20-3998).</li>
</ol>

            </div>);
        }
        /* GEMEINSAME SCHRITTE & ENDE */
        if(isWorkflow === "MatchingVerhältnis"){
            return (<div>Here you define the <strong>ratio of treated to untreated individuals</strong>  for the matching process.
<br/>It is possible that a treated individual cannot be matched with the full number of untreated individuals specified. 

<br/><br/>For example, in a case–control study with a 1:4 matching factor, some cases may be matched with fewer than four controls. However, it is not necessary to exclude such pairs: as long as the analysis accounts for the varying matching factors, by stratifying matched datasets of cases and controls, the estimates remain unbiased. Mixing pairs with different matching ratios does not distort the treatment effect, provided appropriate adjustment is applied (Iwagami et al. 2022 <a href='https://doi.org/10.37737/ace.22005'></a>https://doi.org/10.37737/ace.22005).
</div>);
        }
        if(isWorkflow === "MatchingErgebnis"){
            return (<div>Here you receive both <strong>tabular and graphical summaries of your matching results</strong>, allowing you to check the balance of the covariates you selected.</div>);
        }
        if(isWorkflow === "Datenexport"){
            return (<div>Here you can <strong>locally save</strong> the following items:
<ol>
<li><strong>1.	Matching Protocol:</strong>
The matching protocol includes descriptions of both the original and matched datasets. It also documents all specifications made during the matching process and provides information on balance between treatment and comparison groups, including visual graphs of the matching results.</li>
<li><strong>2.	Matched Dataset:</strong>
The matched dataset contains only the matched pairs. Individuals from the treatment group without a suitable control, and control individuals not required for matching, are excluded.
</li><li><strong>3.	Input Template:</strong>
Optionally, you can save the input settings from the matching process as a template for future matching sessions.</li>
</ol>

            </div>);
        }

    }
    return (
        <Box className="InfoBox"  >
           <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Overview</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {content1()}
                        </Typography>
                </AccordionDetails>

            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography fontSize={"medium"}>Glossary</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {content2()}
                    </Typography>

                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{boxShadow: 1}}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Tips for entering data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {content3()}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Box>

    );
}

export default InfoBox;
