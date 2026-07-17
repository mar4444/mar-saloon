import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import api from '../utils/api.js'
import axios from 'axios';

const Users = () => {
  const [services, setServices] = useState([]);

  const allServices = async () => {
    try {
      const res = await api.get("/api/all-services");
      console.log(res.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    allServices();
  }, []);

  return (
    <Layout pageTitle="Users">
      <div className=''>
        <h1>Users</h1>
      </div>
    </Layout>
  )
}

export default Users