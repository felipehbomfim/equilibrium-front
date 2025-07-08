import EvaluationsContent from "@/components/pages/evaluations/EvaluationsContent";
import {Suspense} from "react";

export const metadata = {
    title: 'Avaliações | Equilibrium',
};

export default function EvaluationsPage() {
    return (
        <Suspense fallback={<div>Carregando avaliações...</div>}>
            <EvaluationsContent />
        </Suspense>
    );
}