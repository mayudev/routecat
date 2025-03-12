export const filterStation = (station) => !!(station.id &&
    station.name &&
    station.location &&
    station.location.latitude &&
    station.location.longitude);
export const mapStation = (station) => ({
    id: station.id,
    name: station.name,
    location: [station.location.latitude, station.location.longitude],
    isMeta: station.isMeta ?? false,
    type: station.type,
});
