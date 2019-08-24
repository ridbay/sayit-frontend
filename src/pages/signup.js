import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { Link } from 'react-router-dom'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress';

const styles ={
    form: {
        textAlign: 'center'
      },
      image: {
        margin: '20px auto 20px auto'
      },
      pageTitle: {
        margin: '5px auto 5px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      }
};



class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        }
        axios.post('/signup', newUserData)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }



    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img src={AppIcon} alt='App icon' width='50' height='50' className={classes.image} />
                    <Typography variant='h2' className={classes.pageTitle}>SignUp</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            label="Email"
                            type='email'
                            name='email'
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            label="Handle"
                            type='text'
                            name='handle'
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            className={classes.textField}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type='password'
                            name='password'
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            label="Confirm Password"
                            type='password'
                            name='confirmPassword'
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>{errors.general}</Typography>
                        )}
                        
                        <Button 
                        type='submit' 
                        variant='contained' 
                        color='primary' 
                        className={classes.button}
                        disabled={loading}
                        >
                            signup {loading && (
                            <CircularProgress size={30} className={classes.progress}/>
                        )}
                        </Button>
                        <br/>
                        <small>
                            Already have an account? Log in <Link to="/login"> here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm> </Grid>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(signup)
