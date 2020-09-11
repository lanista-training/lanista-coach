import React, { useState, useEffect } from 'react'
import {Panel} from './styles'
import {Loader} from 'semantic-ui-react';

 export default ({loading, loginError, users, login}) => {
   return (
     <Panel>
       <div className="logo-wrapper" style={{flex: 1}}>
         <div className="logo" style={{backgroundImage:"url(https://lanista-training.com/bus/maccentercom/logo.png)"}} />
       </div>
       {
         loading &&
         <div className="loading-area">
           <div className="loading-text">Authenticating...</div>
           <Loader>Loading</Loader>
         </div>
       }
       {
         loginError &&
         <div className="error-area">
           Es gabt ein Problem mit deiner Authentifizierung.
         </div>
       }
       {
         !loading && !loginError &&
         <div className="trainer-list-wrapper">
           <div className="trainer-list">
           {
             users.map(user =>
               <div className="trainer" key={user.id} onClick={() => login(user.id)}>
                 <div className="trainer-image" style={{ backgroundImage: "url(" + user.photoUrl + ")"}} />
                 <div className="trainer-background">a</div>
                 <div className="trainer-first-name">{user.first_name}</div>
                 <div className="trainer-last-name">{user.last_name}</div>
               </div>)
           }
           </div>
         </div>
       }
     </Panel>
  )
}
