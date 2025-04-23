'use client';

import React from 'react';
import { useUrlFilters } from '@/hooks/useUrlFilters';
import { CobranzaByClientFilterSchema } from '@/schemas/cobranzaFilters.schema';
import { CobranzaByClientCondition } from '@/services/cobranza/cobranza.interface';

export default function CobranzaByClientFilters() : JSX.Element {
    const { filters, updateFilter } = useUrlFilters(CobranzaByClientFilterSchema);

    return (
        <div className="p-4 flex flex-col gap-4 bg-white rounded-lg shadow-md max-w-3xl">
            {/* Orden */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Ordenar por:</label>
                <select
                    className="border px-2 py-1 rounded"
                    value={filters.cobranzaOrderCondition}
                    onChange={(e) => updateFilter('cobranzaOrderCondition', e.target.value as typeof filters.cobranzaOrderCondition)}
                >
                    {CobranzaByClientCondition.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>

            {/* Flags */}
            {[
                { label: 'Filtrar Tipo Doc', key: 'FilterTipoDoc' },
                { label: 'Filtrar Vencido', key: 'FilterExpired' },
                { label: 'Filtrar No Vencido', key: 'FilterNotExpired' },
            ].map(({ label, key }) => (
                <div key={key} className="flex flex-col">
                    <label className="text-sm font-medium">{label}:</label>
                    <select
                        className="border px-2 py-1 rounded"
                        value={filters[key as keyof typeof filters]}
                        onChange={(e) => updateFilter(key as keyof typeof filters, parseInt(e.target.value))}
                    >
                        <option value={0}>Todos</option>
                        <option value={1}>Sí</option>
                    </select>
                </div>
            ))}

            {/* TipoDoc */}
            <div className="flex flex-col">
                <label className="text-sm font-medium">Tipo de Documento:</label>
                <input
                    type="number"
                    className="border px-2 py-1 rounded"
                    value={filters.TipoDoc}
                    onChange={(e) => updateFilter('TipoDoc', parseInt(e.target.value))}
                />
            </div>

            {/* Fechas */}
            {[
                { label: 'Fecha Inicio', key: 'DateStart' },
                { label: 'Fecha Fin', key: 'DateEnd' },
                { label: 'Fecha Exacta', key: 'DateExactly' },
            ].map(({ label, key }) => (
                <div key={key} className="flex flex-col">
                    <label className="text-sm font-medium">{label}:</label>
                    <input
                        type="date"
                        className="border px-2 py-1 rounded"
                        value={filters[key as keyof typeof filters]}
                        onChange={(e) => updateFilter(key as keyof typeof filters, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}
