import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { firestore } from "../../../constants/firebaseConfig";

const addFavorite = async ({
  userId,
  itemData,
  itemType,
}: {
  userId: string;
  itemData: DishCardType;
  itemType: "dish";
}) => {
  const docRef = doc(firestore, `favorites/${userId}`);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const currentFavorites = docSnap.data()[itemType] || [];
      const itemIndex = currentFavorites.findIndex(
        (fav: { id: string }) => fav.id === itemData.id
      );

      if (itemIndex === -1) {
        const updatedFavorites = [...currentFavorites, itemData];
        await updateDoc(docRef, {
          [itemType]: updatedFavorites,
        });
      }
    } else {
      await setDoc(docRef, {
        [itemType]: [itemData],
      });
    }

    return { userId, itemType, itemData };
  } catch (err) {
    throw new Error("Error adding favorite");
  }
};

export const useAddToFavorites = () => {
  const queryClient = useQueryClient();
  return useMutation(addFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries("favorites");
    },
  });
};
