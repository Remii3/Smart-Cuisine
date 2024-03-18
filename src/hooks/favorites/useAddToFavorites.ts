import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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
    // Check if the document exists
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // If the document exists, append the itemId to the array
      await updateDoc(docRef, {
        [itemType]: arrayUnion(itemId),
      });
    } else {
      // If the document doesn't exist, create it with the itemId in an array
      await setDoc(docRef, {
        [itemType]: [itemId],
      });
    }

    console.log(
      `Added itemId ${itemId} to favorites under user ${userId} and type ${itemType}`
    );
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
