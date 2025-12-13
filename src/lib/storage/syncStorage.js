
export function updateDropStatus(prev, drop_idx, newStatus) {
    return prev.map(drop =>
        drop.drop_idx === drop_idx
            ? { ...drop, status: newStatus }
            : drop
    );
}

export function markDropSyncStatus(prev, drop_idx, newSyncStatus) {
    return prev.map(drop => 
    drop.drop_idx === drop_idx
    ? {...drop, sync_status: newSyncStatus}
    : drop);
}

export function updateDropStart(prev, drop_idx, startTs) {
    return prev.map(drop => 
    drop.drop_idx === drop_idx
    ? {...drop, start_ts: startTs}
    : drop)
}

export function updateDropAddress(prev, drop_idx, newAddress) {
    return prev.map(drop => 
    drop.drop_idx === drop_idx
    ? {...drop, address: newAddress}
    : drop)
}


export function updateDropStop(prev, drop_idx, stopTs) {
    return prev.map(drop => 
    drop.drop_idx === drop_idx
    ? {...drop, end_ts: stopTs}
    : drop)
}


export function showElapsedTime(prev, drop_idx, ms) {
    return prev.map(drop => 
    drop.drop_idx === drop_idx
    ? {...drop, elapsed: ms}
    : drop)
}


