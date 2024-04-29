"use client";

import { useEffect, useState } from "react";
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
import { dp_TPYRWChartData,dp_TQRRWChartData,dp_MVWSChartData,dp_MRWSChartData,dp_TVSChartData,dp_MAPYWSChartData } from '../data/chatdata';
import { useGlobalController } from 'context/useGlobalData';

 const useGraph = () => {

    const [TPYRWChartData,setTPYRWChartData] = useState(dp_TPYRWChartData);
    const [TQRRWChartData,setTQRRWChartData] = useState(dp_TQRRWChartData);
    const [MVWSChartData,setMVWSChartData] = useState(dp_MVWSChartData);
    const [MRWSChartData,setMRWSChartData] = useState(dp_MRWSChartData);
    const [TVSChartData,setTVSChartData] = useState(dp_TVSChartData);
    const [MAPYWSChartData,setMAPYWSChartData] = useState(dp_MAPYWSChartData);
    const [controller, dispatch] = useGlobalController();

    useEffect(()=>{
        setTPYRWChartDataHandler();
    },[]);

    // useEffect(()=>{

    // },[controller.])

    const setTPYRWChartDataHandler = async ()=>{

        const south = [];
        const north = [];
        const central = [];
        const q = query(collection(db, "Records"));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      const prevRecord = doc.data().grid;
      data = [...data, ...prevRecord]
    });


    
        setTPYRWChartData( [
            { data: [35,2,13,4,5,6],label: 'South' },
            { data: [35,2,3,4,5,6],label: 'North' },
            { data: [35,2,3,4,5,6],label: 'Central' },
          ]);

          setTQRRWChartData([
            {
              data: [
                { id: 0, value: 3, label: 'South' },
                { id: 1, value: 5, label: 'North' },
                { id: 2, value: 1, label: 'Central' },
              ],
            },
          ])


          setMVWSChartData([ { data: [1,2,3,4] }]);
          setMRWSChartData([
            {
              value: 1,
              direction: 'Central',
            },
            {
              value: 2,
              direction: 'North',
            },
            {
              value: 3,
              direction: 'South',
            },
          ]);

          setTVSChartData([ { data: [1,2,3,4] }]);
          setMAPYWSChartData([ { data: [1,2,3,4] }]);
    }



  return {
    TPYRWChartData,
    TQRRWChartData,
    MVWSChartData,
    MRWSChartData,
    TVSChartData,
    MAPYWSChartData
  };
};

export default useGraph;