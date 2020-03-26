export interface LogIndexResponse {
    success:    boolean;
    results:    number;
    total:      number;
    parameters: Parameters;
    logs:       Log[];
}

export interface Log {
    id:      number;
    title:   string;
    map:     string;
    date:    number;
    views:   number;
    players: number;
}

export interface Parameters {
    player:   string;
    uploader: null;
    title:    null;
    map:      null;
    limit:    number;
    offset:   number;
}
