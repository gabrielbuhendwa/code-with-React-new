import CoreConcept from "./CoreConcept.jsx";
import { CORE_CONCEPTS } from "../data.JS";

export default function CoreConcepts(){
    return (
        <section id="core-concepts">
            <h2>Core concepts</h2>
                <ul>
                    {CORE_CONCEPTS.map((conceptItem) => (
                      <CoreConcept key={conceptItem.title} {...conceptItem}/>
                ))}
            </ul>
        </section>
    );
}