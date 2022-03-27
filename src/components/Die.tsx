import React from "react";

export interface DieProbs {
    value: number;
    isHeld: boolean;
    id: string;
    hold: () => void;
}

export default function Die({value, isHeld, hold} : DieProbs) {

    const styles = {
        backgroundColor: isHeld ? "#ff6347" : "white"
    }

    return (
        <div 
          className="die-face" 
          style={styles}
          onClick={hold}>{value}</div>
    )
}