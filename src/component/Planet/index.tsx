import React from 'react';
import style from './style.module.less'

export default class Planet extends React.Component {


    render(): React.ReactNode {
        return (
            <div className={style.container}>
                <div className={`${style["star"]} ${style["star-1"]}`}/>
                <div className={`${style["star"]} ${style["star-2"]}`}/>
                <div className={`${style["star"]} ${style["star-3"]}`}/>
                <div className={style["cloud-group-1"]}>
                    <div className={`${style["cloud-1"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-2"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-3"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-4"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-5"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-6"]} ${style["cloud"]}`}/>
                </div>
                <div className={style["cloud-group-2"]}>
                    <div className={`${style["cloud-1"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-2"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-3"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-4"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-5"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-6"]} ${style["cloud"]}`}/>
                </div>
                <div className={style["cloud-group-3"]}>
                    <div className={`${style["cloud-1"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-2"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-3"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-4"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-5"]} ${style["cloud"]}`}/>
                    <div className={`${style["cloud-6"]} ${style["cloud"]}`}/>
                </div>
                <div className={`${style["orbit"]} ${style["orbit-1"]}`}/>
                <div className={`${style["orbit"]} ${style["orbit-2"]}`}/>
                <div className={`${style["orbit"]} ${style["orbit-3"]}`}/>
                <div className={`${style["orbit"]} ${style["orbit-4"]}`}/>
                <div className={`${style["orbit"]} ${style["orbit-5"]}`}/>
                <div className={`${style["orbit"]} ${style["orbit-6"]}`}/>

                <div className={style["ring-before"]}/>
                <div className={style["ring-bigger-before"]}/>
                <div className={style["planet"]}/>
                <div className={style["ring-before"]}/>
                <div className={style["ring-bigger-after"]}/>
                <div className={style["sub-planet"]}/>
            </div>
        )
    }

}