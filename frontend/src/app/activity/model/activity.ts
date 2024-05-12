export interface Activity {
    id_activity: number; // Identifiant de l'activité
    id_user: number;
    type_activity: string; // Type d'activité
    date: Date; // Date de l'activité
    distance_km: number; // Distance parcourue en kilomètres
    duration_min: number; // Durée de l'activité en minutes
    pace: number; // Allure en minutes par kilomètre (Valeur calculée: duration_min / distance_km)
    heart_beat_min: number; // Rythme cardiaque en battements par minute
    temperature_c: number; // Température en degrés Celsius
    description_activity: string; // Nom de l'activité
    comment: string; // Commentaires sur l'activité
    gpx_file: string;
}
