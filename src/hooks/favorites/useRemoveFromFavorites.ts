import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { firestore } from "../../../constants/firebaseConfig";

const removeFavorite = async ({
  userId,
  itemId,
  itemType,
}: {
  userId: string;
  itemId: string;
  itemType: "dish";
}) => {
  const docRef = doc(firestore, `favorites/${userId}`);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentFavorites = docSnap.data()[itemType] || [];
      const updatedFavorites = currentFavorites.filter(
        (item) => item.id !== itemId
      );
      await updateDoc(docRef, {
        [itemType]: updatedFavorites,
      });
    } else {
      throw new Error(
        "No favorites document found for user ${userId} to remove item ${itemId}"
      );
    }

    return { userId, itemType, itemId };
  } catch (err) {
    throw new Error("Error adding favorite");
  }
};

export const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation(removeFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries("favorites");
    },
  });
};
