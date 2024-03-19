import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { firestore } from "../../../constants/firebaseConfig";

const fetchFavorites = async (userId: string) => {
  try {
    const docRef = doc(firestore, `favorites/${userId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().dish;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const useFetchFavorites = (userId: string | null) => {
  if (!userId) return { data: null, isLoading: false, error: null };

  return useQuery(["favorites", userId], () => fetchFavorites(userId));
};
