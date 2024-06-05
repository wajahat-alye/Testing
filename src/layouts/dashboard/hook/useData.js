"use client";

import React, { useEffect, useState, useCallback } from "react";
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
  documentId,
} from "firebase/firestore";
import { db } from "layouts/authentication/firebase/firebase";
import * as reduxData from "context/useGlobalData";
import { useNotifications } from "context/useNotifications";
import { useNotifications1 } from "context/useNotifications1";

const useData = () => {
  const [controller, dispatch] = reduxData.useGlobalController();
  // const [KMOwnerList, setKMOwnerList] = useState([]);
  // const [sectorList, setSectorList] = useState([]);

  // useEffect(() => {
  //   reduxData.setKMOwnerList(dispatch, KMOwnerList);
  // }, [KMOwnerList]);

  // useEffect(() => {
  //   reduxData.setSectorList(dispatch, sectorList);
  // }, [sectorList]);

  const customerListRedux = controller.customerList;
  const KMOwnerListRedux = controller.KMOwnerList;
  const sectorListRedux = controller.sectorList;
  const gridData = controller.gridData;
  const successSB = controller.deshboardToast;

  const saveSectorToFirebase = async () => {
    try {
      const docRef = doc(db, "SectorData", "documentId");
      await setDoc(docRef, { grid: sectorListRedux });
    } catch (e) {
      console.log(e);
    }
  };

  const getSectorFromFirebase = async () => {
    const documentRef = doc(db, "SectorData", "documentId");
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      const documentData = documentSnapshot.data();
      return documentData.grid;
    } else {
      console.log("Document does not exist");
    }
    return [];
  };

  const saveKMOwnerToFirebase = async () => {
    try {
      const docRef = doc(db, "KMOwnerData", "documentId");
      await setDoc(docRef, { grid: KMOwnerListRedux });
    } catch (e) {
      console.log(e);
    }
  };

  const getKMOwnerFromFirebase = async () => {
    const documentRef = doc(db, "KMOwnerData", "documentId");
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      const documentData = documentSnapshot.data();
      return documentData.grid;
    } else {
      console.log("Document does not exist");
    }
    return [];
  };

  const saveCustomerToFirebase = async () => {
    try {
      const docRef = doc(db, "CustomerData", "documentId");
      await setDoc(docRef, { grid: customerListRedux });
    } catch (e) {
      console.log(e);
    }
  };

  const getFromFirebase = async () => {
    const documentRef = doc(db, "CustomerData", "documentId");
    const documentSnapshot = await getDoc(documentRef);
    if (documentSnapshot.exists()) {
      const documentData = documentSnapshot.data();
      return documentData.grid;
    } else {
      console.log("Document does not exist");
    }
    return [];
  };

  const saveToFirebase = async () => {
    try {
      const chunkSize = 500;
      const chunks = [];
      let _gridData = [ ...gridData ]
      while (_gridData.length > 0) {
        const chunk = _gridData.splice(0, chunkSize); // TODO: test this case
        chunks.push(chunk);
      }
      // if (_gridData.length > 500) {
      //   while (_gridData.length > 0) {
      //     const chunk = _gridData.splice(0, chunkSize); // TODO: test this case
      //     chunks.push(chunk);
      //   }
      // } else {
      //   chunks.push(_gridData);
      // }
      chunks.forEach((chunk, index) => {
        const docRef = doc(db, `DeshboardData`, `documentId${index}`);
        setDoc(docRef, { grid: chunk });
      });

      // const docRef = doc(db, `DeshboardData${index}`, "documentId");
      // setDoc(docRef, { grid: chunk });
    } catch (e) {
      console.log(e);
    }
  };

  const getDeshboardData = async () => {
    let documentData = [];
    const citiesRef = await collection(db, "DeshboardData");
    const querySnapshot = await getDocs(citiesRef);
    querySnapshot.forEach((doc) => {
      let rows = doc.data().grid;
      documentData = [...documentData, ...rows];
    });
    return documentData;
  };

  const closeSuccessSB = () => {
    reduxData.setDeshboardToast(dispatch, false);
  };

  return {
    customerListRedux,
    KMOwnerListRedux,
    sectorListRedux,
    getSectorFromFirebase,
    saveSectorToFirebase,
    getKMOwnerFromFirebase,
    saveKMOwnerToFirebase,
    gridData,
    saveCustomerToFirebase,
    saveToFirebase,
    getFromFirebase,
    getDeshboardData,
    successSB,
    closeSuccessSB,
  };
};

export default useData;
