import React from 'react'

import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

import styles from './style.css'

const Dashboard = () => (
  <div className={styles.dashboard}>
    <Card className={styles.card}>
      <CardContent>
        <Typography type='headline' component='h2'>
          Amazing Things To Check Out!
        </Typography>
        <Typography component='p'>
          Like you shoud really look into this one!
        </Typography>
      </CardContent>
      <CardActions>
        <Button dense color='primary'>
          Read More
        </Button>
        <Button dense color='accent'>
          Dismiss
        </Button>
      </CardActions>
    </Card>
    <Card className={styles.card}>
      <CardContent>
        <Typography type='headline' component='h2'>
          Amazing Things To Check Out!
        </Typography>
        <Typography component='p'>
          Like you shoud really look into this one!
        </Typography>
      </CardContent>
      <CardActions>
        <Button dense color='primary'>
          Read More
        </Button>
        <Button dense color='accent'>
          Dismiss
        </Button>
      </CardActions>
    </Card>
    <Card className={`${styles.card} ${styles.important}`}>
      <CardContent>
        <Typography type='headline' component='h2'>
          Amazing Things To Check Out!
        </Typography>
        <Typography component='p'>
          Like you shoud really look into this one!
        </Typography>
      </CardContent>
      <CardActions>
        <Button dense color='primary'>
          Read More
        </Button>
        <Button dense color='accent'>
          Dismiss
        </Button>
      </CardActions>
    </Card>
  </div>
)

export default Dashboard
