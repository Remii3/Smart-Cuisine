import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { firestore } from "../../../constants/firebaseConfig";

const addFavorite = async ({
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
      await updateDoc(docRef, {
        [itemType]: arrayUnion(itemId),
      });
    } else {
      await setDoc(docRef, {
        [itemType]: [itemId],
      });
    }

    return { userId, itemType, itemId };
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
