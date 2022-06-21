import {deleteField, doc, setDoc, updateDoc} from 'firebase/firestore';
import {database} from '../configs/firebase';

export const handleItemList = async (product, list, userId) => {
  const newUserWishlistRef = doc(database, 'wishlist', userId);

  if (list && list?.includes(product)) {
    await updateDoc(newUserWishlistRef, {
      [product?.id?.replace('gid://shopify/Product/', '')]: deleteField(),
    });

    return list.filter((p) => p.id !== product.id);
  }

  const data = {
    [product?.id?.replace('gid://shopify/Product/', '')]: product,
  };

  await setDoc(newUserWishlistRef, data, {merge: true});

  return [...list, product];
};
