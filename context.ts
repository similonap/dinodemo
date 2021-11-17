import React from "react";
import { Dinosaur } from "./types";

interface IDinoContext {
    dinosaurs: Dinosaur[];
    loading: boolean;
    refresh: () => void
}

export const DinoContext = React.createContext<IDinoContext>({
    dinosaurs: [],
    loading: false,
    refresh: () => { }
});