import { useState } from "react";
import FormCadastroPets from "./formCadastroPets";

type Pet = {
    id: number;
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
};

type Props = {
    tema: string;
};

function ListaPets({ tema }: Props) {
    const [pets, setPets] = useState<Pet[]>([
        {
            id: 1,
            nome: "Rex",
            tipo: "Cachorro",
            raca: "Labrador",
            genero: "Macho"
        },
        {
            id: 2,
            nome: "Mimi",
            tipo: "Gato",
            raca: "Siamês",
            genero: "Fêmea"
        }
    ]);
    const [modalAberto, setModalAberto] = useState(false);
    const [petEditando, setPetEditando] = useState<Pet | null>(null);

    const abrirModalNovo = () => {
        setModalAberto(true);
        setPetEditando(null);
    };

    const abrirModalEditar = (pet: Pet) => {
        setModalAberto(true);
        setPetEditando(pet);
    };

    const fecharModal = () => {
        setModalAberto(false);
        setPetEditando(null);
    };

    const excluirPet = (id: number) => {
        setPets(prev => prev.filter(p => p.id !== id));
    };

    const handleSubmitPet = (dados: { nome: string; tipo: string; raca: string; genero: string }) => {
        if (petEditando) {
            setPets(prev =>
                prev.map(p =>
                    p.id === petEditando.id
                        ? { ...p, ...dados }
                        : p
                )
            );
        } else {
            const novoPet: Pet = {
                id: pets.length > 0 ? Math.max(...pets.map(p => p.id)) + 1 : 1,
                nome: dados.nome,
                tipo: dados.tipo,
                raca: dados.raca,
                genero: dados.genero,
            };
            setPets(prev => [...prev, novoPet]);
        }
        setModalAberto(false);
        setPetEditando(null);
    };

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Pets</h2>
                <button className="btn btn-primary" onClick={abrirModalNovo}>
                    Novo Pet
                </button>
            </div>
            <ul className="list-group">
                {pets.map(pet => (
                    <li
                        key={pet.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        style={pet.id === 4 ? { backgroundColor: tema } : {}}
                    >
                        <span>
                            <strong>{pet.nome}</strong> - Tipo: {pet.tipo} - Raça: {pet.raca} - Gênero: {pet.genero}
                        </span>
                        <div>
                            <button
                                className="btn btn-sm btn-warning me-2"
                                onClick={() => abrirModalEditar(pet)}
                            >
                                Atualizar
                            </button>
                            <button
                                className="btn btn-sm btn-danger"
                                onClick={() => excluirPet(pet.id)}
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {modalAberto && (
                <div className="modal show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {petEditando ? "Atualizar Pet" : "Novo Pet"}
                                </h5>
                                <button type="button" className="btn-close" onClick={fecharModal}></button>
                            </div>
                            <div className="modal-body">
                                <FormCadastroPets
                                    pet={petEditando ? {
                                        nome: petEditando.nome,
                                        tipo: petEditando.tipo,
                                        raca: petEditando.raca,
                                        genero: petEditando.genero,
                                    } : undefined}
                                    onSubmit={handleSubmitPet}
                                    onCancel={fecharModal}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListaPets;