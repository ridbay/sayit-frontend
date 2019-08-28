import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton';
import DeleteSayit from './DeleteSayit'

// MUI stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// icons 
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder  from '@material-ui/icons/FavoriteBorder'
// redux 
import {connect} from 'react-redux'
import {likeSayit, unlikeSayit} from '../redux/actions/dataActions'



const styles ={
    card: {
        position:'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image:{
        minWidth: 200,
    },
     content:{
         padding: 25,
         objectFit: 'cover',
     }
}

export class Sayit extends Component {
    likedSayit = () => {
        if (
            this.props.user.likes &&
            this.props.user.likes.find(
                like => like.sayitId === this.props.sayit.sayitId
            )
        )
            return true;
        else return false
    };
    likeSayit = () => {
        this.props.likeSayit(this.props.sayit.sayitId);
    }
    unlikeSayit = () => {
        this.props.unlikeSayit(this.props.sayit.sayitId);
    }
    render() {
        dayjs.extend(relativeTime)
        const { classes, 
            sayit : {
                body, 
                createdAt, 
                userImage, 
                userHandle, 
                sayitId, 
                likeCount, 
                commentCount},
                user: {
                   authenticated,
                   credentials: { handle}
                } 
            } = this.props;
            const likeButton = !authenticated ? (
                <MyButton tip="Like">
                    <Link to='/login'>
                        <FavoriteBorder color="primary"/>
                    </Link>
                </MyButton>
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
            const deleteButton = authenticated && userHandle === handle ? (
                <DeleteSayit sayitId={sayitId} />
            ) : null
        return (
            <Card className={classes.card}>
                <CardMedia 
                image={userImage}
                title="Profile image"
                className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`}
                    color="primary"
                    >
                    {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography 
                    variant="body2" 
                    color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography 
                    variant="body1">{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} comments</span>
                </CardContent>
            </Card> 
            
        )
    }
}

Sayit.propTypes = {
    likeSayit: PropTypes.func.isRequired,
    unlikeSayit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    sayit: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    user: state.user,
})

const mapActionsToProps = {
    likeSayit,
    unlikeSayit,
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Sayit));
