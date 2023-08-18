import React, { useEffect, useState, useRef } from 'react'
import './assets/css/header.css'
import { BiSearchAlt as Search_Ico } from 'react-icons/bi'
import { FiSettings as Setting_ico } from 'react-icons/fi';
import { MdOutlineApps as App_ico } from 'react-icons/md';
import { BsThreeDotsVertical as Three_ico } from 'react-icons/bs';
import { MdLogout as MdLogout } from 'react-icons/md';

import { MdNotifications as Notify_ico } from "react-icons/md";
import Propic from '../../Assets/Images/profile.png'
import Logo from '../../Assets/Images/logoMish.png'
import secureLocalStorage from 'react-secure-storage';
import { Link, useNavigate } from 'react-router-dom';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import CancelIcon from '@mui/icons-material/Cancel';
import TableRowsIcon from '@mui/icons-material/TableRows';
import { useSelector, useDispatch } from 'react-redux';
import { fetchApiData  } from '../../redux/slices/GetSlice';
const config = require('../../config.json')



const Header = (props) => {
  const [isMultilevel, setMultilevel] = useState([])
  const [isMultiLevelError, setMultiLevelError] = useState(false)
  const [childCount, setchildCount] = useState(null)
  const navigate = useNavigate()
  const ref = useRef()
  const [loading, setLoading] = useState(true);
  const [dataLoader, setDataLoader] = useState(false);

  const [isShowIconOne, setisShowIconOne] = useState("")
  const [isShowIconTwo, setisShowIconTwo] = useState("")
  const [isShowIconThree, setisShowIconThree] = useState("")

  var get_refresh_token = secureLocalStorage.getItem("refresh");
  var get_access_token = secureLocalStorage.getItem("access_token");

  const dispatch = useDispatch();
  const getData = useSelector((state) => state.getData);
  const apiStatus = useSelector((state) => state.getData.status);
  const getDataError = useSelector((state) => state.getData.error);

  async function getMultiLevelDropDown() {
    await fetch(`${config['baseUrl']}/dirmenus/GetDirMenus`, {
      method: "GET",
      headers: { "content-type": "application/json", "accessToken": `Bareer ${get_access_token}` }
    }).then((response) => {
      return response.json()
    }).then(async (response) => {
      if (response.messsage == "unauthorized") {
        await fetch(`${config['baseUrl']}/dirmenus/GetDirMenus`, {
          method: "GET",
          headers: { "content-type": "application/json", "refereshToken": `Bareer ${get_refresh_token}` }
        }).then(response => {
          return response.json()
        }).then(response => {
          if (response.messsage == "timeout error") { navigate('/') }
          else {
            secureLocalStorage.setItem("refresh", response.referesh_token);
            secureLocalStorage.setItem("access_token", response.access_token);
            setMultilevel(response.data)
            setDataLoader(true);
          }
        }).catch((error) => {
          setMultiLevelError(error.message)
        }).finally(() => {
          setLoading(false);
        });
      }
      else {
        setMultilevel(response.data)
        setDataLoader(true);
      }
    }).catch((error) => {
      setMultiLevelError(error.message)
    })
      .finally(() => {
        setLoading(false);
      });
  }



  const [isActive, setActive] = useState(false)
  const checkSideBar = () => {
    setActive(!isActive)
  }

  const logOutHandler = () => {
    secureLocalStorage.clear()
    window.location.href = '/'
  }
  
  // const API_URL = "/dirmenus/GetDirMenus"
  // console.log("GetDirMenus",getData)
  // useEffect(() => {
  //   dispatch(fetchApiData(API_URL));
  // }, [dispatch]);

  useEffect(() => {
    getMultiLevelDropDown()
  }, [])




  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="row HeaderMain d-flex justify-content-between">
            <div className="col-lg-6 col-md-6 col-sm-6 d-flex align-items-center ColMobileRes">
              <h4 className="Header_logo">
                <TableRowsIcon onClick={checkSideBar} />
              </h4>
              <div className="form-group">
                <div className="from-control Header_Search">
                  <input type="text" placeholder="Search" />
                  <Search_Ico className="Search_ico" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3 d-flex align-items-center justify-content-center ColMobileRes2">
              <div className="Header_Settings">
                <Setting_ico className="Settings_ico" />
                <App_ico className="App_ico" />
                <Three_ico className="three_ico" />
                <Notify_ico className="notify_ico" />
              </div>
              <div>
                <img src={Propic} alt="" className="profile_img" />
              </div>
            </div>
          </div>
        </div>

        <div className='treeViewBox' id={isActive ? "openSideBar" : ""}>
          <CancelIcon className='closeIco' onClick={() => { setActive(false) }} />
          <img src={Logo} className="logoImg" alt="" />
          <span className='borderLogo'></span>
          {loading && (
            <div
              className="d-flex justify-content-center pt-2 w-100"
              style={{ background: "white" }}
            >
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
              </div>
            </div>
          )}

          {dataLoader && (
            <>
              <ul className='menuBoxUl'>
                {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].map((items, index) => (
                  <>
                    {items.ParentCode == 0 ?
                      <li onClick={(e) => {
                        e.stopPropagation();
                        if (isShowIconOne == items.menulabel) {
                          setisShowIconOne("")
                        } else {
                          setisShowIconOne(items.menulabel)
                        }
                      }}>
                        <div className='flexLinks'>
                          {isShowIconOne == items.menulabel ? <ExpandMoreIcon /> : items.menulabel == "Logout" ? "" : <ChevronRightIcon />}
                          <Link to="#">{items.menulabel == "Logout" ? "" : items.menulabel}</Link>
                        </div>
                        {isShowIconOne == items.menulabel && (
                          <div className='ulList'>
                            {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == items.menucode && data.Level == 2).map((innerItemsOne) => (
                              <li
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (isShowIconTwo == innerItemsOne.menulabel) {
                                    setisShowIconTwo("")
                                  } else {
                                    setisShowIconTwo(innerItemsOne.menulabel)
                                  }
                                }}
                              >
                                <div className="flexLinks">
                                  {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == innerItemsOne.menucode && data.Level == 3).length > 0 ? isShowIconTwo == innerItemsOne.menulabel ? <ExpandMoreIcon /> : <ChevronRightIcon /> : "" : ""}
                                  {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == innerItemsOne.menucode && data.Level == 3).length > 0 ? isShowIconTwo == innerItemsOne.menulabel ? <Link to="#">{innerItemsOne.menulabel}</Link> : <Link to="#">{innerItemsOne.menulabel}</Link> : <Link onClick={() => {
                                    if (innerItemsOne.menulabel) {
                                      const originalString = innerItemsOne.menulabel;
                                      const stringWithoutSpaces = originalString.split(' ').join('_');
                                      window.location.href = `/${stringWithoutSpaces}`
                                    }
                                  }} className='singleItem'>{innerItemsOne.menulabel}</Link> : ""}
                                </div>
                                {isShowIconTwo == innerItemsOne.menulabel && (
                                  <div className='ulList'>
                                    {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == innerItemsOne.menucode && data.Level == 3).map((three) => (
                                      <li
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (isShowIconThree == three.menulabel) {
                                            setisShowIconThree("")
                                          } else {
                                            setisShowIconThree(three.menulabel)
                                          }
                                        }}
                                      >

                                        <div className="flexLinks">
                                          {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == three.menucode && data.Level == 4).length > 0 ? isShowIconThree == three.menulabel ? <ExpandMoreIcon /> : <ChevronRightIcon /> : "" : ""}

                                          {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == three.menucode && data.Level == 4).length > 0 ? <Link to="#">{three.menulabel}</Link> : <Link to="#"
                                            onClick={() => {
                                              if (three.menulabel) {
                                                const originalString = three.menulabel;
                                                const removeSubstrace = originalString. replace(" – ", "_")
                                                const stringWithoutSpaces = removeSubstrace.split(' ').join('_');
                                                window.location.href = `/${stringWithoutSpaces}`
                                              }
                                            }}
                                            className='singleItem' target='_blank'>{three.menulabel}</Link> : ""}

                                        </div>

                                        {isShowIconThree == three.menulabel && (
                                          <div className='ulList'>
                                            {isMultilevel && isMultilevel.length > 0 ? isMultilevel[0].filter(data => data.ParentCode == three.menucode && data.Level == 4).map((four) => (
                                              <li
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                }}
                                              >
                                                <Link to="#" className='singleItem4'
                                                  onClick={() => {
                                                    if (four.menulabel) {
                                                      const originalString = four.menulabel;
                                                      const removeSubstrace = originalString. replace(" – ", "_")
                                                      const stringWithoutSpaces = removeSubstrace.split(' ').join('_');
                                                      window.location.href = `/${stringWithoutSpaces}`
                                                    }
                                                  }}
                                                target='_blank'>{four.menulabel}</Link>
                                              </li>
                                            )) : ""}
                                          </div>
                                        )}
                                      </li>
                                    )) : ""}
                                  </div>
                                )}
                              </li>
                            )) : ""}
                          </div>
                        )}

                      </li>
                      : ""}
                  </>
                )) : ""}
                <li>
                  <div className='flexLinks'>
                    <Link className='LogOutLinkDesktop' onClick={logOutHandler}>Logout</Link>
                  </div>
                </li>
              </ul>
            </>
          )}

          <a href="#" className='mobileLogOutLink' onClick={logOutHandler}>
            <MdLogout /> Log out</a>
        </div>
      </section>
    </>
  );
};

export default Header;





