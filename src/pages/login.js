import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import Button from '@material-ui/core/Button'

// MUI stuff
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles ={
    form:{
        textAlign: 'center'
    },
    image:{
        margin: '20px auto 20px auto'
    },
    pageTitle:{
        margin: '5px auto 5px auto'
    },
    textField:{
        margin: '100px auto 10px auto'
    }
};



class login extends Component {
    constructor(){
        super();
        this.state={
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }
    handleSubmit = (event) =>{
        console.log('hi')
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    

    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img src={AppIcon} alt='App icon' width='50' height='50' className={classes.image}/> 
                    <Typography variant='h2' className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            label="Email"
                            type='email'
                            name='email'
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type='password'
                            name='password'
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <Button type='submit' variant='contained' color='primary'  className={classes.button}>Login</Button>
                    </form>
                    </Grid>
                <Grid item sm> </Grid>
            </Grid>
        )
    }
}

login.propTypes ={
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(login)
