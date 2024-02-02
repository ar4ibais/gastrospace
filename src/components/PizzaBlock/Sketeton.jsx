import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="140" cy="125" r="125" />
        <rect x="0" y="270" rx="10" ry="10" width="280" height="23" />
        <rect x="-1" y="325" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="427" rx="10" ry="10" width="95" height="30" />
        <rect x="128" y="427" rx="22" ry="22" width="152" height="45" />
    </ContentLoader>
)

export default Skeleton