import React, { Component } from 'react';
import axios from 'axios'
import Grid from '@material-ui/core/Grid';

import Sayit from '../components/Sayit'

export class home extends Component {
    state={
        sayits: null,
    }
    componentDidMount(){
        axios.get('/sayits')
        .then(res => {
            console.log(res.data)
            this.setState({
                sayits: res.data
            })
        })
        .catch(err=> console.error(err))

    }
    render() {
        let recentSayitsMarkup = this.state.sayits ? (
            this.state.sayits.map(sayit => <Sayit sayit={sayit}/>)
        ) : <p>Loading....</p>
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentSayitsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
