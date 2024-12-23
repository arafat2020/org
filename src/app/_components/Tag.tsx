import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Edit, Loader2, PlusIcon, Trash2Icon } from 'lucide-react';
import { trpc } from '../_trpc/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useDebounceCallback } from 'usehooks-ts';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

interface TagProp {
    edit: boolean;
    tag: { id: string; name: string; Product: { id: string; }[]; } | null
    id: string;
}

const Tag = ({ edit, tag, id }: TagProp) => {
    const [editTag, setEditTag] = useState({ edit: false, id: "" });
    const [filterQuery, setFilterQuery] = useState(""); // State for filter query
    const utils = trpc.useUtils();

    const { isLoading, data } = trpc.tag.getTag.useQuery();
    const { mutate, isPending } = trpc.tag.addTag.useMutation({
        onSuccess: () => {
            utils.tag.getTag.invalidate();
            toast.success("New tag added");
        },
        onError: (error) => toast.error(`Failed: ${error.message}`),
    });

    const { mutate: mutateTag } = trpc.tag.editTag.useMutation({
        onSuccess: () => {
            utils.tag.getTag.invalidate();
            toast.success("Tag Updated");
        },
        onError: (error) => toast.error(`Failed: ${error.message}`),
    });

    const { mutate: deleteTag } = trpc.tag.removeTag.useMutation({
        onSuccess: () => {
            utils.tag.getTag.invalidate();
            toast.success("Tag Deleted");
        },
        onError: (error) => toast.error(`Failed: ${error.message}`),
    });

    const editTagDebounce = useDebounceCallback((name, tagID) => mutateTag({ id: tagID, name }));

    const {
        mutate: tagProduct,
        isPending: tagPending
    } = trpc.tag.tagToProduct.useMutation({
        onSuccess: async () => {
            await utils.product.getProductById.invalidate({
                id
            });
            await utils.tag.getTag.invalidate();
            toast.success("Tagged to product");
        },
        onError: (error) => toast.error(`Failed: ${error.message}`),
    })

    const {
        mutate: unTagProduct,
        isPending: unTagPending
    } = trpc.tag.unTagToProduct.useMutation({
        onSuccess: async () => {
            await utils.product.getProductById.invalidate({
                id
            });
            await utils.tag.getTag.invalidate();
            toast.success("Untagged to product");
        },
        onError: (error) => toast.error(`Failed: ${error.message}`),
    })
    // Filter tags based on the query
    const filteredTags = data?.filter((tag) =>
        tag.name.toLowerCase().includes(filterQuery.toLowerCase())
    );
    return (
        <div className={cn("w-full flex flex-col space-y-3 transition duration-300 !mt-20",
            !edit ? "scale-100" : "scale-0"
        )}>
            <Label>Edit Tag</Label>
            <div className='flex space-x-2 min-h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'>
                {/* {tag?.length ? tag.map(e => (
                    <Badge key={e.id}>{e.name}</Badge>
                )) : <p>no Tag selected</p>} */}
                {
                    tag ? <Badge>{tag?.name}</Badge> : <p>no Tag selected</p>
                }
            </div>
            <div className="w-full md:w-2/3 bg-neutral-950 p-3 flex flex-col space-y-3 rounded-md">
                <div className="flex space-x-3 items-center">
                    <Input
                        type="text"
                        placeholder="Search Tag"
                        value={filterQuery} // Controlled input
                        onChange={(e) => setFilterQuery(e.target.value)} // Update query
                    />
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <button onClick={() => mutate()} disabled={isPending}>
                                    {isPending ? <Loader2 className="animate-spin" /> : <PlusIcon />}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Add Tag</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                {isLoading ? (
                    <div className="w-full flex justify-around">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : (
                    <div className="w-full max-h-[300px] overflow-y-auto flex flex-col space-y-3 p-3">
                        {filteredTags?.length ? (
                            filteredTags.map((e) => {
                                    console.log(!!e.Product.filter(e => e.id === id).length);
                                return <div key={e.id} className="flex space-x-3 items-center">
                                <Checkbox
                                    disabled={tagPending || unTagPending}
                                    checked={!!e.Product.filter(e => e.id === id).length}
                                    onCheckedChange={() => {
                                        !!e.Product.filter(e => e.id === id).length ?
                                            unTagProduct({
                                                productId: id,
                                                tagTd: e.id
                                            }) :
                                            tagProduct({
                                                productId: id,
                                                tagTd: e.id
                                            })
                                    }}
                                />
                                <input
                                    type="text"
                                    disabled={!editTag.edit}
                                    defaultValue={e.name}
                                    onChange={(event) => editTagDebounce(event.target.value, e.id)}
                                    className={cn("p-1 flex-grow rounded-sm", editTag.edit && editTag.id === e.id && "bg-slate-900 border-cyan-950")}
                                />
                                <Edit
                                    role="button"
                                    onClick={() => setEditTag({ edit: !editTag.edit, id: e.id })}
                                />
                                <Trash2Icon role="button" onClick={() => deleteTag({ id: e.id })} />
                            </div>
                            })
                        ) : (
                            <p>No tags match your search</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tag;
