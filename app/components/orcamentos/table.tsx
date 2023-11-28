import Orcamentos from "@/app/core/Orcamentos"
import { EditorIcon, TrashIcon } from "../icons/table"
import Peca from "@/app/core/Peca"

interface TableProps {
    orcamentos: Orcamentos[]
    orcamentoSelect?: (orcamentos: Orcamentos) => void
    orcamentoRemoved?: (orcamentos: Orcamentos) => void
}
export default function Table(props: TableProps) {

    const displayActions = props.orcamentoSelect || props.orcamentoRemoved

    function idIsNull(id? : string){
        if(id == null) {
            return " "
        }
        else{
            return id;
        }
    }

    function renderHeader() {
        return (
            <tr>
                <th className="text-center p-3">Id</th>
                <th className="text-center p-3">Tempo Fabricação (H)</th>
                <th className="text-center p-3">Preço Total (R$)</th>
                <th className="text-center p-3">Peça Orçada</th>
                <th className="text-center p-3">Material Utilizado</th>
                <th className="text-center p-3">Status</th>
                {displayActions ? <th className="p-3">Ações</th> : false}
            </tr>
        )
    }

    function renderData() {
        return props.orcamentos?.map((orcamentos, i) => {
            return (
                <tr key={orcamentos.id}
                    className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-center p-3">{orcamentos.id}</td>
                    <td className="text-center p-3">{orcamentos.tempoFabricacao} h</td>
                    <td className="text-center p-3">R$ {orcamentos.precoTotal}</td>
                    <td className="text-center p-3">{idIsNull(orcamentos.peca?.codigo)}</td>
                    <td className="text-center p-3">{idIsNull(orcamentos.material?.descricao)}</td>
                    <td className="text-center p-3">{orcamentos.status}</td>
                    {displayActions ? renderActions(orcamentos) : false}
                </tr>)
        })
    }

    function renderActions(orcamentos: Orcamentos) {
        return (
            <td className="flex justify-center">
                {props.orcamentoSelect
                    ? (<button onClick={() => props.orcamentoSelect?.(orcamentos)}
                        className={`flex justify-center items text-green-600
            rounded-full p-2 m-1 hover:bg-gray-100`}>{EditorIcon}</button>)
                    : false}
                {props.orcamentoRemoved
                    ? (<button onClick={() => props.orcamentoRemoved?.(orcamentos)}
                        className={`flex justify-center items text-red-600
            rounded-full p-2 m-1 hover:bg-gray-100`}>{TrashIcon}</button>)
                    : false}
            </td>)
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100
        bg-gradient-to-r from-indigo-500 to-indigo-800`}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderData()}
            </tbody>
        </table>
    )
}