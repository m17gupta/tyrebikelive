"use client"

import { Render } from "@measured/puck";
import { config } from "./config";


export const RenderClient = ({data}) => {
    return (
        <Render config={config} data={data} />
    )
}
