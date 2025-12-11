
export function updateDropStatus(prev, drop_idx, newStatus) {
    return prev.map(drop =>
        drop.drop_idx === drop_idx
            ? { ...drop, status: newStatus }
            : drop
    );
}

export function markDropPending(prev, drop_idx, newSyncStatus) {
    return prev.map(drop => 
    drop.drop_idx === drop_idx
    ? {...drop, sync_status: newSyncStatus}
    : drop);
}

export function setdropTs(prev, drop_idx, startTs) {
    return prev.map(drop => 
    drop.drop_idx === drop_idx
    ? {...drop, start_ts: startTs}
    : drop)
}
