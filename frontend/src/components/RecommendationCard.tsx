import React from 'react'
import '../../styles/global.css'

export default function RecommendationCard({image, name, confidence, explain, onSelect}:{image:string,name:string,confidence:number,explain:string,onSelect:()=>void}){
  return (
    <div className="rec-card">
      <img src={image} alt={name} className="rec-img"/>
      <div className="rec-body">
        <div className="rec-header">
          <strong>{name}</strong>
          <span className="rec-confidence">{Math.round(confidence*100)}%</span>
        </div>
        <p className="rec-explain">{explain}</p>
        <button className="btn btn-primary btn-lg" onClick={onSelect}>Choose</button>
      </div>
    </div>
  );
}
