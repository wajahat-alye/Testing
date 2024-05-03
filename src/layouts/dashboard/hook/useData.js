"use client";

import React,{ useEffect, useState,useCallback } from "react";
import {
  addDoc,
  collection,
  where,
  query,
  deleteDoc,
  updateDoc,
  doc,
  setDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "layouts/authentication/firebase/firebase";
import * as reduxData from "context/useGlobalData";

 const useData = () => {
    const [controller, dispatch] = reduxData.useGlobalController();
    const [customerList,setCustomerList] = useState([]);
    const [KMOwnerList,setKMOwnerList] = useState([]);
    const [sectorList,setSectorList] = useState([]);
    const [rows, setRows] = useState([]);


    useEffect(()=>{
      reduxData.setCustomerList(dispatch, customerList)
    },[customerList])

    useEffect(()=>{
      reduxData.setKMOwnerList(dispatch, KMOwnerList)
    },[KMOwnerList])

    useEffect(()=>{
      reduxData.setSectorList(dispatch, sectorList)
    },[sectorList])

    useEffect(()=>{
      reduxData.setGridData(dispatch, rows)
    },[rows])

    const customerListRedux = controller.customerList;
    const KMOwnerListRedux = controller.KMOwnerList;
    const sectorListRedux = controller.sectorList;
    const gridData = controller.gridData;


  return {
    customerList,
    customerListRedux,
    KMOwnerListRedux,
    sectorListRedux,
    rows,
    setRows,
    gridData,
    setCustomerList,KMOwnerList,setKMOwnerList,sectorList,setSectorList
  };
};

export default useData;