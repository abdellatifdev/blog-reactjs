import React, { useState, useEffect } from 'react';
import PostKindApi from '../../api/PostKindApi';
const NavTag = () => {
    const [kinds,setKinds] = useState([]);

    const fetchPostKinds = async () => {
        try {
          const data = await PostKindApi.findAll();
          setKinds(data);
        } catch (error) {
          console.log(error.response);
        }
      };

      useEffect(() => {
        fetchPostKinds();
      }, []);

    return ( 
        <div className="nav-scroller py-1 mb-2">
            <nav className="nav d-flex justify-content-between">
            {kinds.map((kind) => (
                <a className="p-2 text-muted" key={kind.id} href="#">
                {kind.name}
            </a>
            ))}
        </nav>
      </div>
     );
}
 
export default NavTag;