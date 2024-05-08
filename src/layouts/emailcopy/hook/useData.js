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


    const saveSummaryData = async (grid) => {
      try {
        const collectionRef = collection(db, "Records");
        const docRef = doc(collectionRef, "DeshboardData");
        await setDoc(docRef, { grid });
        // Success("Successfully Saved Records");
      } catch (e) {
        console.log(e);
        // Warn("Failed to Save Records");
      }
    }
  
    const getSummaryData = async () => {
      // const q = query(collection(db, "Records"));
      // const querySnapshot = await getDocs(q);
      // let data = [];
      // querySnapshot.forEach((doc) => {
      //   const prevRecord = doc.data().grid;
      //   data = [...data, ...prevRecord]
      // });
  
      // return data;
      return [];
    }


  return {
    saveSummaryData,getSummaryData
  };
};

export default useData;