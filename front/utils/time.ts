/**
 * Aqui são definidas as funções utilitárias para a manipulação de datas e tempo.
 */

/**
 * Converte o tempo passado como parâmetro para uma string amigável informando a diferença até o tempo atual.
 * @param time 
 * @returns 
 */
export function convertAgeTimeToSlugText(time: Date | string): string {
    const notificationCreatedAt: Date = new Date(time);
    const now: Date = new Date();

    const diffInMs = now.getTime() - notificationCreatedAt.getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHr = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHr / 24);

    if(diffInSec < 60) return 'Agora mesmo';
    if(diffInMin < 60) return `Há ${diffInMin} minuto${diffInMin === 1 ? '' : 's'}`;
    if(diffInHr < 24) return `Há ${diffInHr} hora${diffInHr === 1 ? '' : 's'}`;
    if(diffInDays === 1) return 'Ontem';
    if(diffInDays <= 7) return `Há ${diffInDays} dia${diffInDays === 1 ? '' : 's'}`;

    return notificationCreatedAt.toLocaleDateString('pt-BR');
}