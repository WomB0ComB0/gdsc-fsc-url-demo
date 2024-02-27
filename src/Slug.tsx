import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "@/core/firebase";
import { toast } from 'sonner';

export const Slug = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = collection(db, "urls");
        const q = query(docRef, where('slug', "==", slug));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          toast.error('Error: No such document!');
          navigate('/');
          return;
        }

        const firstDoc = querySnapshot.docs[0];
        const finalUrl = firstDoc.data().url;
        setUrl(finalUrl ?? 'No final url');


          window.location.replace(finalUrl);


      } catch (error) {
        toast.error(`Error getting documents: ${error}`);
      }
    };

    fetchData();
  }, [navigate, slug]);

  return (
    <>
      <div className={`flex flex-col items-center justify-center w-full h-full gap-2`}>
        <h1 className={`text-3xl font-bold text-center`}>
          Redirecting to {slug}...
        </h1>
        <p className={`text-xl text-center`}>
          {url}
        </p>
      </div>
    </>
  );
};
