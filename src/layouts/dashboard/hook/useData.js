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
import { useNotifications } from 'context/useNotifications';
import { useNotifications1 } from 'context/useNotifications1';

 const useData = () => {
    const [controller, dispatch] = reduxData.useGlobalController();
    const [customerList,setCustomerList] = useState([]);
    const [KMOwnerList,setKMOwnerList] = useState([]);
    const [sectorList,setSectorList] = useState([]);
    const [rows, setRows] = useState([]);
  // const { openSuccessSB, closeSuccessSB } = useNotifications();
  // const { openSuccessSB, closeSuccessSB } = useNotifications1();

  // const [successSB, setSuccessSB] = useState(false);
  
  
  // const openSuccessSB = () => setSuccessSB(true);
  // const closeSuccessSB = () => setSuccessSB(false);


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
    const successSB = controller.deshboardToast;


    const saveToFirebase = async ()=>{

      try {
        const collectionRef = collection(db, "Records");
        const docRef = doc(collectionRef, "DeshboardData");
        await setDoc(docRef, { gridData });
        // Success("Successfully Saved Records");
        // openSuccessSB();
        reduxData.setDeshboardToast(dispatch, true)
      } catch (e) {
        console.log(e);
        // Warn("Failed to Save Records");
      }
    }


    const closeSuccessSB = ()=>{
      reduxData.setDeshboardToast(dispatch, false)

    }

  return {
    customerList,
    customerListRedux,
    KMOwnerListRedux,
    sectorListRedux,
    rows,
    setRows,
    gridData,
    saveToFirebase,successSB,closeSuccessSB,
    setCustomerList,KMOwnerList,setKMOwnerList,sectorList,setSectorList
  };
};

export default useData;