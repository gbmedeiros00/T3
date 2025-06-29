import React, { useState, ChangeEvent, FormEvent } from "react";

type Props = {
    pet?: {
        nome: string;
        tipo: string;
        raca: string;
        genero: string;
    };
    onSubmit: (pet: { nome: string; tipo: string; raca: string; genero: string }) => void;
    onCancel: () => void;
};

const FormCadastroPets: React.FC<Props> = ({ pet, onSubmit, onCancel }) => {
    const [nome, setNome] = useState(pet?.nome || "");
    const [tipo, setTipo] = useState(pet?.tipo || "");
    const [raca, setRaca] = useState(pet?.raca || "");
    const [genero, setGenero] = useState(pet?.genero || "");

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === "nome") setNome(value);
        else if (name === "tipo") setTipo(value);
        else if (name === "raca") setRaca(value);
        else if (name === "genero") setGenero(value);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ nome, tipo, raca, genero });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Nome</label>
                <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={nome}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Tipo</label>
                <input
                    type="text"
                    className="form-control"
                    name="tipo"
                    value={tipo}
                    onChange={handleChange}
                    required
                    placeholder="Ex: Cachorro, Gato"
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Raça</label>
                <input
                    type="text"
                    className="form-control"
                    name="raca"
                    value={raca}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Gênero</label>
                <select
                    className="form-select"
                    name="genero"
                    value={genero}
                    onChange={handleChange}
                    required
                >
                    <option value="">Selecione</option>
                    <option value="Macho">Macho</option>
                    <option value="Fêmea">Fêmea</option>
                </select>
            </div>
            <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-secondary me-2" onClick={onCancel}>
                    Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                    Salvar
                </button>
            </div>
        </form>
    );
};

export default FormCadastroPets;