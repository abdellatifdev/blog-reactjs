import React, { useState, useEffect } from 'react';
import PostKindApi from '../../api/PostKindApi';
import { Link } from 'react-router-dom';
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
                <Link className="p-2 text-muted"  key={kind.id} 
                     to={`/posts/category/${kind.name}`} >
                    {kind.name}
                </Link>
            ))}
        </nav>
      </div>
     );
}

export default NavTag;