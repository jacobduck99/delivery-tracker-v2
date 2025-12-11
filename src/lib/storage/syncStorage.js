
export function changeDropStatus(prev, drop_idx, newStatus) {
    return prev.map(drop =>
        drop.drop_idx === drop_idx
            ? { ...drop, status: newStatus }
            : drop
    );
}
