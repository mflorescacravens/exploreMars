import React, {useState, useEffect} from 'react'
import './App.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        marginTop: 20,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

function PicturesList({rover, handleRoverChange, pageNum}) {
    const classes = useStyles();
    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&page=${pageNum}&api_key=lwwON4lcFqWw0zXubbcETbUPjgEtP3st0LT6d2no`).then((response) => {
            setPictures(response.data.photos);
            console.log(pageNum)
        }) 
    }, [rover, pageNum])

    let content;
    if (pictures.length) {
        return  (
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={2.5}>
                    {pictures.map(function(picture, id) {
                        return (
                            <GridListTile key={id}>
                                <img src={picture.img_src} alt={picture.img_src} />
                                <GridListTileBar
                                title={picture.img_src}
                                classes={{
                                    root: classes.titleBar,
                                    title: classes.title,
                                }}
                                actionIcon={
                                    <IconButton aria-label={`star ${picture.img_src}`}>
                                    {/* <StarBorderIcon className={classes.title} /> */}
                                    </IconButton>
                                }
                                />
                            </GridListTile>
                        )
                    })}
                </GridList>
            </div>
        )
        // content = <p>pictures are here</p>

    } else {
    // there is no data, show a placeholder
        content = <p>Click a rover to see pictures!</p>
    }
    return (
        <div>
            <h3>Rover Pictures</h3>
            {content}
        </div>
    )
}



export default PicturesList;