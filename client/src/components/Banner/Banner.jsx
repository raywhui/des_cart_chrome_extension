import React from "react";
import "./Banner.css";
import BannerPic from "./banner.jpg";
import ProfileDefault from "./profile_default.png";

class Banner extends React.Component{
	render(){
		return (
			<div className="banner" onClick={this.props.onClick}>
				<img 
					className="banner banner-background" 
					src={BannerPic || this.props.bannerSrc} 
					alt="banner" 
				/>
				<img 
					className="profile"	
					src={this.props.profileSrc || ProfileDefault} 
					alt={this.props.children} 
				/>
				<div className="name">{this.props.name}</div>
			</div>
		)
	}
}

export default Banner;