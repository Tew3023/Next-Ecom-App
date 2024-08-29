'use client'

export default function DeleteBtn({ id }) {
  const handleDelete = async (id) => {
    try {
        const res = await fetch(`/api/admin/users`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
          });
      
      if (res.status === 200) {
        console.log('Deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete the user:', error);
    }
  };

  return (
    <button onClick={() => handleDelete(id)} className="px-2 py-1 rounded-md text-red-600">
      Delete
    </button>
  );
}
