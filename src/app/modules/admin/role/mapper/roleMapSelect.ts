/**
 * MAP FOR DATA CONSISTENCY
 */
export default function roleSelectMap(data) {
  return {
    value: data.uuid,
    label: `${data.name}`,
  };
}
