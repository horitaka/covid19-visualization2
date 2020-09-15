import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    // fontSize: theme.typography.pxToRem(15),
    // fontWeight: theme.typography.fontWeightRegular,
  },
  icon: {
    height: '1.6',
    textAlign: 'center',
  },
  icon2: {
    lineHeight: '1.6',

  },
  item: {
    margin: '10px 10px',
  },
}));


export default function LinkItem(props) {
  const { linkList, linkCategoryTitle, linkCategoryIcon, defaultExpanded } = props
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded={defaultExpanded}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h6" color="textPrimary" align="center">
            {linkCategoryIcon}
            {linkCategoryTitle}
          </Typography>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container>
          {

            linkList.map((link, index) => {
              return (
                <Grid key={index} item xs={12} className={classes.item}>
                  <Link href={link.url} target="_blank" rel="noopener noreferrer" color="secondary">
                    {link.text}
                  </Link>
                </Grid>
              )
            })
          }
          </Grid>
        </ExpansionPanelDetails>

      </ExpansionPanel>

    </div>
  );
}
