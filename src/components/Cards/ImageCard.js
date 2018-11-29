import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import styles from './styles';

const ImageCard = ({ classes, text, imagePath, imageClass }) => (
  <div>
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="headline" className="title-style">
            {text}
          </Typography>
          <Typography
            variant="subheading"
            className="count-style"
            color="textSecondary"
          />
        </CardContent>
      </div>
      <div className={`dash-icon ${imageClass}`}>
        <img src={imagePath} alt={text} />
      </div>
      {/* <CardMedia className={classes.cover} image={imagePath} title={text} /> */}
    </Card>
  </div>
);

ImageCard.defaultProps = {
  count: 0
};

ImageCard.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  imagePath: PropTypes.string.isRequired,
  imageClass: PropTypes.string.isRequired
};

export default withStyles(styles)(ImageCard);
