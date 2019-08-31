import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types'
import Sayit from '../components/sayit/Sayit'
import Profile from '../components/profile/Profile'
import SayitSkeleton from '../util/SayitSkeleton'

import {connect} from 'react-redux'
import {getSayits} from '../redux/actions/dataActions'

class home extends Component {
    
    componentDidMount() {
        this.props.getSayits();
      }
    render() {
        const {sayits, loading} = this.props.data;

        let recentSayitsMarkup = !loading ? (
            sayits.map(sayit => <Sayit key={sayit.sayitId} sayit={sayit}/>)
        ) : (
        <SayitSkeleton />
        );
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentSayitsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    getSayits: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    data: state.data
})
export default connect(
    mapStateToProps,
    { getSayits }
  )(home);

