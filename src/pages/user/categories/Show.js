import React, { useEffect, useState } from 'react'
import axios from 'axios'
import url from '../../../utils/url'
import { useParams } from 'react-router-dom'

import Navbar from '../../../components/UserNavbar/Index'
import VideoList from '../../../components/VideoList/Index'
import LoadingComponent from '../../../components/Loading/Index'
import FourOFourComponent from '../../../components/FourOFour/Index'

const Show = () => {
    const { id, name } = useParams()
    const [isLoading, setLoading] = useState(false)
    const [videos, setVideos] = useState([])

    useEffect(() => {
        // Fetch category videos
        const fetchVideos = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`${url}users`)
                setVideos(response.data)
                setLoading(false)
            } catch (error) {
                if (error) {
                    console.log(error)
                }
            }
        }

        fetchVideos()
    }, [id, name])

    // Slice name
    const sliceName = name => {
        return name.slice(0, 15)
    }

    return (
        <div>
            <Navbar title={sliceName(name)} back={true} />

            {isLoading ? <LoadingComponent /> :
                <div className="container">
                    <div className="row">
                        {videos.length > 0 ?
                            < div className="col-12 px-1">
                                <VideoList videos={videos} />
                            </div>
                            :
                            <div className="col-12 p-4">
                                <FourOFourComponent />
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    );
};

export default Show;