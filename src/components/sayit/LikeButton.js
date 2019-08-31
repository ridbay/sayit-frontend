import React, { Component } from 'react';
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Icons 
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'

// Redux 
import { connect } from 'react-redux'
import { likeSayit, unlikeSayit } from '../../redux/actions/dataActions'

class LikeButton extends Component {
    likedSayit = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                like => like.sayitId === this.props.sayitId
            )
        )
            return true;
        else return false
    };
    likeSayit = () => {
        this.props.likeSayit(this.props.sayitId);
    }
    unlikeSayit = () => {
        this.props.unlikeSayit(this.props.sayitId);
    }
    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to='/login'>
                <MyButton tip="Like">
                    <FavoriteBorder color="primary" />
                </MyButton>
            </Link>
        ) : (
                this.likedSayit() ? (
                    <MyButton tip="Undo like" onClick={this.unlikeSayit}>
                        <FavoriteIcon color="primary" />
                    </MyButton>
                ) : (
                        <MyButton tip="Like" onClick={this.likeSayit}>
                            <FavoriteBorder color="primary" />
                        </MyButton>
                    )
            );
        return likeButton;
    }
}

LikeButton.propTypes = {
    likeSayit: PropTypes.func.isRequired,
    unlikeSayit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    sayitId: PropTypes.string.isRequired,

}

const mapStateToProps = (state) => ({
    user: state.user,
})
const mapActionsToProps = {
    likeSayit,
    unlikeSayit,
}
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
