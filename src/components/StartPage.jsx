import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


import SpeechToTextDemo from './SpeechToTextDemo';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                ShopLyft
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
        flexWrap: 'wrap',
    },
    toolbarTitle: {
        flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(2),
    },
    card: {
        height: '250px'
    },
    footer: {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: theme.spacing(8),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
        },
    },
}));

const tiers = [
    {
        title: 'Covid-19',
        price: '77',
        description: [' of people passing away from complications of COVID-19 are over 75'],
    },
    {
        title: 'Technological gap',
        price: '87',
        description: [
            'of elderly people never have been online.',
        ],
    },
    {
        title: 'Easy to use',
        price: null,
        description: [
            'Order groceries to your home with just a phone call, no internet needed',
        ],
    },
];
const footers = [
    {
        title: 'Company',
        description: ['Team', 'History', 'Contact us', 'Locations'],
    },
    {
        title: 'Legal',
        description: ['Privacy policy', 'Terms of use'],
    },
];

export default function StartPage() {
    const classes = useStyles();
    const [page, setPage] = useState("Home");

    function addHomeContent() {
        return (
           <div>
                <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    ShopLyft
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
            The revolutionary AI no contact shopping assistant. 
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" component="p">
            *This is just a web based frontend simulation of the real phone solution.
        </Typography>
            </Container>
      {/* End hero unit */ }
        <Container maxWidth="md" component="main">
            <Grid container spacing={5} alignItems="flex-end">
                {tiers.map((tier) => (
                    // Enterprise card is full width at sm breakpoint
                    <Grid item key={tier.title} xs={12} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                        <Card className={classes.card}>
                            <CardHeader
                                title={tier.title}
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                action={tier.title === 'Pro' ? <StarIcon /> : null}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <div className={classes.cardPricing}>
                                    {tier.price !== null 
                                    ?
                                    <div>
                                    <Typography component="h2" variant="h3" color="textPrimary">
                                        {tier.price} %
                                    </Typography>
                                    </div>
                                    :
                                        null
                                    }
                                </div>
                                <ul>
                                    {tier.description.map((line) => (
                                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                                            {line}
                                        </Typography>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button 
                                    fullWidth
                                    variant={tier.buttonVariant}
                                    color="primary"
                                    onClick={()=>setPage("Assistant")}
                                    >
                                    {tier.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
        </Container>
          {/* Footer */}
          <Container maxWidth="md" component="footer" className={classes.footer}>
                <Grid container spacing={4} justify="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="textPrimary" gutterBottom>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item}>
                                        <Link href="#" variant="subtitle1" color="textSecondary">
                                            {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
            {/* End footer */}
           </div>
      )
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                        ShopLyft
          </Typography>
                    <nav>
                        <Link 
                            variant="button"
                            color="textPrimary"
                            href="#"
                            className={classes.link}
                            onClick={()=>setPage("Home")}
                        >
                            Home
            </Link>
                        <Link 
                            variant="button"
                            color="textPrimary" 
                            href="#" 
                            className={classes.link}
                            onClick={()=>setPage("Assistant")}
                        >
                            Assistant
            </Link>
                    </nav>
                </Toolbar>
            </AppBar>
            {/* Hero unit */}
                {page === "Assistant"
                 ?
                 <SpeechToTextDemo />
                 :
                 addHomeContent()
                }
        </React.Fragment>
    );
}